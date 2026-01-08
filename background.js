// background.js

// Reset the running state when the browser starts up
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ isRunning: false });
    console.log("LinkedIn Auto Liker: State reset on startup.");
});

// Also reset on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isRunning: false });
    console.log("LinkedIn Auto Liker: Installed.");
});
