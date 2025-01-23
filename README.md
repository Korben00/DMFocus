# DMFocus for X

> No tweets, no ads - just DM

A browser extension that provides access to X.com private messages through a clean and simplified interface.

## Features

- Quick access to private messages via a toolbar button
- Clean interface showing only the messages area
- Preserves all messaging features (message sending, attachments, etc.)
- Automatic dark mode support

## Installation

### Firefox
1. Open Firefox and type `about:debugging` in the address bar
2. Click on "This Firefox" in the left menu
3. Click on "Load Temporary Add-on"
4. Navigate to the extension's `src` folder and select the `manifest.json` file

### Chrome
1. Open Chrome and type `chrome://extensions` in the address bar
2. Enable "Developer mode" in the top right
3. Click on "Load unpacked"
4. Navigate to the extension's `chrome/src` folder and select it

## Usage

1. Click on the DMFocus icon in the toolbar
2. A new tab will open showing only the X.com messages area
3. Log in to your X.com account if you haven't already
4. You can now read and send messages in a clean interface

## Project Structure

```
├── src/                  # Firefox version
│   ├── manifest.json     # Manifest V2
│   ├── css/
│   │   └── content.css  # Styles
│   ├── js/
│   │   ├── background.js
│   │   └── content.js
│   └── icons/
│
└── chrome/              # Chrome version
    └── src/
        ├── manifest.json # Manifest V3
        ├── css/
        ├── js/
        └── icons/
```

## Security Notes

- The extension does not store any authentication data
- It only uses the existing X.com session in your browser
- Requested permissions are limited to the strict minimum required

## Author

**Korben** - [korben.info](https://korben.info)

## License

MIT
