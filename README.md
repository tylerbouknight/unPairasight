# unPairasight: Advanced Vault Encryption for Obsidian

unPairasight supercharges Obsidian's native security capabilities. With an array of features like tag-based file management, AES-256-CBC encryption, and user interface, unPairasight fills the security gaps in your Obsidian workflow.

    **IMPORTANT**: Please, for my sake, backup your vault before testing! This plugin has been tested on windows and iOS.

---

## Key Features

- **AES-256-CBC Encryption**: Secure your files with industry-standard encryption.
    
- **Tag-Managed File Selection**: Encrypt or bypass files based on their tags.
    
- **Auto-Encrypt**: Desktop users enjoy the luxury of auto-encryption upon app closure.
    

---

## Getting Started

### Installation

To get your hands on unPairasight, clone this repository and place it in your Obsidian's `plugins` folder. If you're on mobile, a bit of gymnastics is required. Clone the repo using [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) and juggle the folder with [Owlfiles](https://apps.apple.com/us/app/owlfiles-file-manager/id510282524).

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

Hit `Settings > unPairasight` to fine-tune your encryption tag policies.

---

## Contributing

Have a killer feature in mind? Pull requests are your friends. For monumental alterations, kindly start by raising an issue.

## TODO List

We have big plans for unPairasight, and your contributions can accelerate its evolution. Here's a glimpse of the roadmap:

### Minor Changes

- **Notification Preferences**: Add an option for users to toggle on/off notices for encryption completion and file count milestones. This would allow for a personalized balance between automation and user awareness.

- **UI/UX Enhancements**: Make modals and user interfaces more intuitive and aesthetically pleasing.
    
- **Password Security**: Elevate password requirements with character count, special characters, and a match/confirm mechanism.
    
- **Undo Trap**: Address the Ctrl+Z loophole that allows users to revert encrypted text in an open file.
    
- **Panic Button**: Add a quick "Encrypt Now" button to the Obsidian ribbon bar for immediate vault encryption.

### Major Changes

- **Encryption Flexibility**: Allow users to select from multiple encryption algorithms, making the plugin adaptable to specific security needs.
    
- **Two-Factor Authentication**: Investigate the feasibility of integrating 2FA as an additional layer of security.
    
- **Timed Auto-Lock**: Implement a feature to automatically lock the vault after a user-defined period of inactivity.
    
- **Selective Decryption**: Add the capability to decrypt specific files or folders within the vault, based on user-defined criteria.
    
- **Backup and Restore**: Develop a system for users to conveniently back up and restore their encrypted vaults.
    
- **Audit Logs**: Introduce logging to monitor encryption and decryption activities, useful for both troubleshooting and security assessments.
    
- **Plugin Compatibility**: Ensure unPairasight works seamlessly with other popular Obsidian plugins.
    

---

## Caveats & Limitations

- **Password Peril**: Lose your password and you'll lose your data—no recovery.
    
- **Algorithm Monogamy**: AES-256-CBC is our only flavor. Love it or leave it.
    
- **Blind Decryption**: We don't validate file integrity before decryption. Proceed at your own risk.
    
- **Selective Operations**: As of now, no batch processing based on folders or other tags.
    
- **Audit-Free Zone**: No logs to retrace your encryption steps or omissions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
