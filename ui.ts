import { App, Modal, PluginSettingTab, Setting } from "obsidian";
import UnPairasightPlugin from "./main";
import { verifyPassword } from "./encryption";

export class PasswordModal extends Modal {
  plugin: UnPairasightPlugin;
  isFirstRun: boolean;

  constructor(
    app: App,
    plugin: UnPairasightPlugin,
    isFirstRun: boolean,
    isDecrypt: boolean = false
  ) {
    super(app);
    this.plugin = plugin;
    this.isFirstRun = isFirstRun;
  }

  onOpen() {
    this.createUI();
  }

  createUI() {
    let { contentEl } = this;
    const title = this.isFirstRun
      ? "Create Password to Lock Vault"
      : "Enter Password to Unlock Vault";
    contentEl.createEl("h2", { text: title });

    const passwordInput = contentEl.createEl("input", { type: "password" });
    const unlockButton = contentEl.createEl("button", { text: "Unlock" });

    unlockButton.addEventListener("click", () =>
      this.handleUnlock(passwordInput.value)
    );
  }

  async handleUnlock(password: string, isDecrypt: boolean = false) {
    if (isDecrypt) {
      if (await verifyPassword(password, this.plugin.settings.passwordHash!)) {
        this.plugin.decryptVault(password).catch((err) => {
          console.error("Failed to decrypt vault:", err);
        });
        this.close();
      } else {
        // Show an error message or retry logic
        console.error("Incorrect password");
      }
    } else {
      this.plugin.setPassword(password);
      this.plugin.decryptVault(password).catch((err) => {
        console.error("Failed to decrypt vault:", err);
      });
      this.close();
    }
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}

export class UnPairasightSettingTab extends PluginSettingTab {
  plugin: UnPairasightPlugin;

  constructor(app: App, plugin: UnPairasightPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName("Tags to Encrypt")
      .setDesc("Comma-separated list of tags you want to encrypt")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.tagsToEncrypt?.join(", ") || "")
          .onChange(async (value) => {
            this.plugin.settings.tagsToEncrypt = value
              .split(",")
              .map((tag) => tag.trim());
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Tags to Skip")
      .setDesc("Comma-separated list of tags you don't want to encrypt")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.tagsToSkip?.join(", ") || "")
          .onChange(async (value) => {
            this.plugin.settings.tagsToSkip = value
              .split(",")
              .map((tag) => tag.trim());
            await this.plugin.saveSettings();
          })
      );
  }
}
