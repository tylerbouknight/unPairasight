export const SIGNATURE = "[ENCRYPTED]";

const arrayBufferToHex = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const encrypt = async (text: string, password: string) => {
  const iv = new Uint8Array(16);
  window.crypto.getRandomValues(iv);
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    enc.encode(text)
  );

  return SIGNATURE + arrayBufferToHex(iv) + arrayBufferToHex(encryptedContent);
};

export const decrypt = async (text: string, password: string) => {
  if (!text.startsWith(SIGNATURE)) {
    return text;
  }

  text = text.substring(SIGNATURE.length);
  const iv = new Uint8Array(
    text
      .substring(0, 32)
      .match(/.{1,2}/g)!
      .map((byte: string) => parseInt(byte, 16))
  );

  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const encryptedContent = new Uint8Array(
    text
      .substring(32)
      .match(/.{1,2}/g)!
      .map((byte: string) => parseInt(byte, 16))
  );
  const decryptedContent = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    key,
    encryptedContent
  );

  return new TextDecoder().decode(decryptedContent);
};

export const hashPassword = async (password: string) => {
  const enc = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest(
    "SHA-256",
    enc.encode(password)
  );
  return arrayBufferToHex(hashBuffer);
};

export const verifyPassword = async (
  inputPassword: string,
  storedHash: string
) => {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
};
