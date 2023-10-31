# unPairasight: Advanced Vault Encryption for Obsidian

unPairasight supercharges Obsidian's native security capabilities. With features like tag-based file management and AES-256-CBC encryption, unPairasight fills the security gaps in your Obsidian workflow.

**IMPORTANT**: Please, for my sake, backup your vault before using! Tested only on Windows and iOS.

---

## Key Features

- **AES-256-CBC Encryption**: Secure your files with industry-standard encryption.
    
- **Tag-Managed File Selection**: Encrypt or bypass files based on their tags.
    
- **Auto-Encrypt**: Desktop users enjoy the luxury of auto-encryption upon app closure.
  - Beta 1 release implements URI scheme to trigger vault encryption using obsidian://unpairasight#encrypt. This means that for iOS, you can use Shortcuts to set an automation when obsidian closes, to run the URI and "auto" encrypt the vault. 
    

---

## Getting Started

### Installation

To get your hands on UnPairasight, clone this repository and place it in your Obsidian's `plugins` folder. If you're on mobile, a bit of gymnastics is required. Clone the repo using [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) and juggle the folder with [Owlfiles](https://apps.apple.com/us/app/owlfiles-file-manager/id510282524).

### Initialization

#### Newbies

1. After installation, you'll be greeted with a modal prompting a password setup.
2. Once set, your vault is now encryptable.

#### Seasoned Users

1. A password prompt pops up upon startup.
2. Input your password to unlock your data and proceed with your Obsidian ventures.

---

## How to Use

### Commands

- **Encrypt Vault**: Manually secure your entire vault.
    
- **Decrypt Vault**: Reveal the contents. Password needed, obviously.
    
- **Purge Password**: Ditch the existing password. Be careful with this one.
    

### Preferences

Hit `Settings > UnPairasight` to fine-tune your encryption tag policies.

---

## Contributing

Have a killer feature in mind? Pull requests are your friends. For monumental alterations, kindly start by raising an issue.

---

## Caveats & Limitations

- **Password Peril**: Lose your password and you'll lose your data—no recovery.
    
- **Algorithm Monogamy**: AES-256-CBC is our only flavor. Love it or leave it.
    
- **Blind Decryption**: We don't validate file integrity before decryption. Proceed at your own risk.
    
- **Selective Operations**: As of now, no batch processing based on folders or other tags.
    
- **Audit-Free Zone**: No logs to retrace your encryption steps or omissions.
