# unPairasight: Vault Encryption for Obsidian

unPairasight adds tag-based AES-256-CBC encryption to Obsidian, closing gaps in the app’s built-in security.  

**Note:** Back up your vault before using. Tested on Windows and iOS.

---

## Features

- **AES-256-CBC encryption** — industry-standard file security  
- **Tag-based control** — choose which notes to encrypt or skip  
- **Auto-encrypt on exit** — automatic vault encryption when Obsidian closes  
  - iOS users can run encryption via Shortcut using:  
    `obsidian://unpairasight#encrypt`

---

## Installation

Clone this repository and place it in your Obsidian `plugins` folder.

---

## Initialization

### New Users
1. On first launch, set your password.  
2. Your vault is now ready for encryption.

### Returning Users
1. Enter your password at startup to unlock your vault.

---

## Commands

- **Encrypt Vault** — encrypt all eligible files  
- **Decrypt Vault** — decrypt files (password required)  
- **Purge Password** — clear stored password; irreversible

---

## Settings

Open `Settings → unPairasight` to adjust tag-based encryption preferences.
