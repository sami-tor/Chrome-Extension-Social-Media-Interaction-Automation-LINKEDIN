document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const statusBadge = document.getElementById('statusBadge');
    const statusText = document.getElementById('statusText');
  
    // Initialize state
    chrome.storage.local.get(['isRunning'], (result) => {
      updateUI(result.isRunning);
    });
  
    toggleBtn.addEventListener('click', () => {
      chrome.storage.local.get(['isRunning'], (result) => {
        const newState = !result.isRunning;
        
        // Save state
        chrome.storage.local.set({ isRunning: newState });
        
        // Update UI
        updateUI(newState);
        
        // Send message to active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle', state: newState });
          }
        });
      });
    });
  
    function updateUI(isRunning) {
      if (isRunning) {
        statusBadge.classList.add('status-running');
        statusText.textContent = 'Running';
        toggleBtn.textContent = 'Stop Liking';
        toggleBtn.classList.remove('primary');
        toggleBtn.classList.add('danger');
      } else {
        statusBadge.classList.remove('status-running');
        statusText.textContent = 'Stopped';
        toggleBtn.textContent = 'Start Liking';
        toggleBtn.classList.remove('danger');
        toggleBtn.classList.add('primary');
      }
    }
  });
