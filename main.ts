import { Plugin, Notice, Modal } from "obsidian";
import { extractFrontmatter, hasMatchingTag } from "./utils";
import * as Encryption from "./encryption";
import { PasswordModal, UnPairasightSettingTab } from "./ui";

interface UnPairasightSettings {
  passwordSet: boolean;
  purged: boolean;
  passwordHash?: string;
  tagsToEncrypt?: string[];
  tagsToSkip?: string[];
}

// Main Plugin Class
export default class UnPairasightPlugin extends Plugin {
  password: string | null = null;
  isFirstRun: boolean = true;
  settings: UnPairasightSettings;
  readonly SIGNATURE: string = "[ENCRYPTED]";

  // Lifecycle Methods
  async onload() {
    await this.loadSettings();
    this.registerCommands();
    this.handleWorkspaceEvents();
    this.addSettingTab(new UnPairasightSettingTab(this.app, this));
    window.addEventListener(
      "beforeunload",
      this.beforeUnloadHandler.bind(this)
    );
  }

  handleWorkspaceEvents() {
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.passwordSet) {
        new PasswordModal(this.app, this, false).open();
      } else {
        new PasswordModal(this.app, this, true).open();
      }
    });

    this.registerEvent(
      this.app.workspace.on("quit", async () => {
        if (this.settings.passwordSet && this.password) {
          await this.encryptVault(this.password);
        }
      })
    );
  }

  showEncryptionModal() {
    const modal = new Modal(this.app);
    modal.contentEl.createEl("h2", { text: "Encrypting..." });
    modal.contentEl.createEl("p", {
      text: "Obsidian will automatically close when complete.",
    });
    modal.open();
  }

  async beforeUnloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = "";
    this.showEncryptionModal();
    if (this.password) {
      await this.encryptVault(this.password);
    } else {
      new PasswordModal(this.app, this, false).open();
    }
    window.close();
  }

  // Settings Management
  async loadSettings() {
    this.settings = Object.assign(
      {
        passwordSet: false,
        purged: false,
        tagsToEncrypt: [],
        tagsToSkip: [],
      },
      await this.loadData()
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  setPassword(password: string) {
    this.password = password;
    this.settings.passwordSet = true;
    this.saveSettings();
  }
  async registerCommands() {
    // Encrypt Vault Command
    this.addCommand({
      id: "encrypt-vault",
      name: "Encrypt Vault",
      callback: () => this.promptPasswordIfNeededThenEncrypt(),
    });

    // Decrypt Vault Command
    this.addCommand({
      id: "decrypt-vault",
      name: "Decrypt Vault",
      callback: () => {
        new PasswordModal(this.app, this, false, true).open();
      },
    });

    // Purge Password Command
    this.addCommand({
      id: "purge-password",
      name: "Purge Password",
      callback: () => this.purgePassword(),
    });
  }

  promptPasswordIfNeededThenEncrypt() {
    if (this.password) {
      this.encryptVault(this.password);
    } else {
      new PasswordModal(this.app, this, false).open();
    }
  }

  purgePassword() {
    this.password = null;
    this.settings.passwordSet = false;
    this.settings.purged = true;
    this.saveSettings();
    new Notice("Password successfully purged.");
  }

  // Encryption & Decryption Logic
  async encryptVault(password: string) {
    const fileCache = this.app.vault.getMarkdownFiles();
    const tagsToEncrypt = this.settings.tagsToEncrypt || [];
    const tagsToSkip = this.settings.tagsToSkip || [];

    const encryptPromises = fileCache.map(async (file) => {
      let fileContent = await this.app.vault.read(file);

      if (fileContent.startsWith(this.SIGNATURE)) return;

      const frontmatter = extractFrontmatter(fileContent);

      if (hasMatchingTag(frontmatter, tagsToSkip)) {
        return; // Skip encryption for these files
      }

      if (
        tagsToEncrypt.length > 0 &&
        !hasMatchingTag(frontmatter, tagsToEncrypt)
      ) {
        return; // Only encrypt files that have matching tags
      }
      const encryptedContent = await Encryption.encrypt(fileContent, password);
      await this.app.vault.modify(file, encryptedContent);
    });

    await Promise.all(encryptPromises);
  }

  async decryptVault(password: string) {
    const fileCache = this.app.vault.getMarkdownFiles();
    const decryptPromises = fileCache.map(async (file) => {
      let fileContent = await this.app.vault.read(file);
      if (!fileContent.startsWith(this.SIGNATURE)) return;
      const decryptedContent = await Encryption.decrypt(fileContent, password);
      await this.app.vault.modify(file, decryptedContent);
    });
    await Promise.all(decryptPromises);
  }
}
