# Chrome Extension: Social Media Interaction Automation (Educational)

**⚠️ DISCLAIMER: EDUCATIONAL PURPOSES ONLY ⚠️**
This project is created strictly for **educational purposes** to demonstrate how to build Chrome Extensions using Manifest V3, perform DOM manipulation, and handle asynchronous JavaScript events. 

**Use of this tool on your personal account may violate LinkedIn's User Agreement and could lead to account restriction or banning.** The author is not responsible for any consequences resulting from the use of this software.

## 📝 Overview
This is a Chrome Extension that automates interaction on the LinkedIn feed. It demonstrates technical concepts such as:
- **Manifest V3** implementation.
- **Content Scripts** for DOM access.
- **Message Passing** between popup and content scripts.
- **State Management** using `chrome.storage.local`.
- **CSS Selectors** for identifying complex UI elements.

## 🚀 Features
- **Auto-Scroll**: Automatically scrolls down the feed to load new content.
- **Button Detection**: Smart detection of "Like" buttons using ARIA labels and CSS classes.
- **State Persistence**: Remembers "Running" state even if the popup is closed.
- **Visual Feedback**: Clean, premium UI to control the automation.

## 🛠️ Installation
Since this is an educational project, it is not published on the Chrome Web Store. You must install it in **Developer Mode**:

1.  Clone or download this repository.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** (toggle in the top-right corner).
4.  Click **Load unpacked**.
5.  Select the folder containing this project's files (where `manifest.json` is located).

## 💻 Usage
1.  Navigate to [LinkedIn.com](https://www.linkedin.com/feed).
2.  Click the **Extension Icon** in your browser toolbar.
3.  Click **"Start Liking"**.
4.  The script will begin scrolling and clicking "Like" on visible posts.
5.  Click **"Stop Liking"** to pause operations.

## 🔧 Technical Details
- **Languages**: HTML, CSS, JavaScript.
- **Architecture**:
    - `background.js`: Handles extension lifecycle (resetting state on install/startup).
    - `popup.js`: UI logic and user input handling.
    - `content.js`: Injected script that interacts with the webpage DOM.

## � Connect
Created by **Sami Ullah**.
[Connect on LinkedIn](https://www.linkedin.com/in/sami-ullah-19ba71333/)

## �📄 License
This project is open-source and available under the [MIT License](LICENSE).
