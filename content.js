console.log("LinkedIn Auto Liker: Content script loaded");

let isRunning = false;
let autoLikeTimer = null;

// Initialize state from storage
chrome.storage.local.get(['isRunning'], (result) => {
    if (result.isRunning) {
        startLiking();
    }
});

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
        if (request.state) {
            startLiking();
        } else {
            stopLiking();
        }
    }
});



function startLiking() {
    if (isRunning) return;
    isRunning = true;
    console.log("LinkedIn Auto Liker: Started");

    // Start the loop
    processNextPost();
}

function stopLiking() {
    isRunning = false;
    if (autoLikeTimer) {
        clearTimeout(autoLikeTimer);
        autoLikeTimer = null;
    }
    console.log("LinkedIn Auto Liker: Stopped");
}

function processNextPost() {
    if (!isRunning) return;

    console.log("LinkedIn Auto Liker: Scanning for posts...");

    // Broad selector for buttons that might be "Like" buttons
    // 1. Selector based on aria-label containing "Like" (case insensitive usually, but CSS is strict)
    // 2. Selector looking for specific SVG icons or text if possible (harder in pure CSS)
    // We will grab ALL buttons and filter them in JS for better accuracy.

    const allButtons = Array.from(document.querySelectorAll('button'));

    const unlikedButtons = allButtons.filter(btn => {
        // Must be visible
        if (btn.offsetParent === null) return false;

        const ariaLabel = btn.getAttribute('aria-label') || "";
        const text = btn.innerText || "";

        // Check if it's a Like button
        // It usually says "Like [Name]'s post" or just "Like"
        // avoiding "Comment", "Share", "Send"
        const isLikeButton = (ariaLabel.includes("Like") || text.trim() === "Like") &&
            !ariaLabel.includes("Comment") &&
            !ariaLabel.includes("Reply");

        if (!isLikeButton) return false;

        // Check if already liked
        // detailed check: active buttons often have 'active' class or aria-pressed="true"
        // If aria-label says "Undo like" or "React", it's usually actively liked

        const isPressed = btn.getAttribute('aria-pressed') === 'true';
        const isActive = btn.classList.contains('active') ||
            btn.classList.contains('artdeco-button--type-primary') || // primary often means active state for reactions
            ariaLabel.includes("Undo like");

        // Refined check: On modern LinkedIn feed, "React Like" is the unliked state. "Undo Like" is liked.
        // But sometimes it is just "Like".
        // Let's assume if it contains "Undo", it's liked.
        if (ariaLabel.includes("Undo")) return false;

        return !isPressed && !isActive;
    });

    console.log(`Found ${unlikedButtons.length} potential unliked buttons.`);

    if (unlikedButtons.length > 0) {
        const targetBtn = unlikedButtons[0];

        console.log("Targeting button:", targetBtn);

        // Scroll into view
        targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Click after delay
        setTimeout(() => {
            if (!isRunning) return;

            console.log("Clicking now...");
            targetBtn.click();

            // Wait longer after click before next search to allow UI to update
            autoLikeTimer = setTimeout(processNextPost, 2000);
        }, 1000); // 1s wait before click

    } else {
        console.log("No unliked buttons found in current DOM, scrolling down...");
        window.scrollBy({ top: 300, behavior: 'smooth' });

        // Wait for scroll and potential lazy loading
        autoLikeTimer = setTimeout(processNextPost, 2000);
    }
}
