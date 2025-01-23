// Debug function to help identify elements
const debugElement = (element) => {
    console.log('Element:', element);
    console.log('ID:', element.id);
    console.log('Class:', element.className);
    console.log('Data attributes:', element.dataset);
    if (element.parentElement) {
        console.log('Parent:', element.parentElement);
    }
};

// Create and setup XDM container
const createXDMContainer = () => {
    const container = document.createElement('div');
    container.id = 'xdm-header';
    container.innerHTML = `
        <h1>DMFocus for X - No tweets, no ads - just DM | By <a href="https://korben.info" target="_blank" style="color: white; text-decoration: underline;">Korben</a></h1>
    `;
    return container;
};

// Ensure a clean interface
const ensureCleanInterface = () => {
    // Add our header if it's not already there
    if (!document.getElementById('xdm-header')) {
        document.body.insertBefore(createXDMContainer(), document.body.firstChild);
    }

    // Debug: Log important elements
    console.log('Debugging XDM elements:');
    const mainElement = document.querySelector('main');
    if (mainElement) {
        debugElement(mainElement);
        
        // Find the message input area
        const messageInputs = document.querySelectorAll('[data-testid*="dmComposerTextInput"]');
        console.log('Message input elements found:', messageInputs.length);
        messageInputs.forEach(input => debugElement(input));
        
        // Find the message container
        const messageContainer = document.querySelector('[data-testid="DMDrawer"]');
        console.log('Message container:', messageContainer);
        if (messageContainer) debugElement(messageContainer);
        
        // Find the conversation list
        const conversationList = document.querySelector('[data-testid="conversations"]');
        console.log('Conversation list:', conversationList);
        if (conversationList) debugElement(conversationList);
    }
};

// Initialize the interface
const initializeInterface = () => {
    // Wait for the main content to be ready
    const observer = new MutationObserver((mutations, obs) => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            ensureCleanInterface();
            
            // Continue observing for dynamic changes
            obs.disconnect();
            observer.observe(mainElement, {
                childList: true,
                subtree: true
            });
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

// Start the initialization
initializeInterface();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'refresh') {
        ensureCleanInterface();
        sendResponse({ status: 'ok' });
    }
});
