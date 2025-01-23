// Constants
const DM_URL = 'https://x.com/messages';

// Handle toolbar icon click
browser.browserAction.onClicked.addListener(() => {
    // Check if we already have a DM tab open
    browser.tabs.query({})
        .then(tabs => {
            const existingTab = tabs.find(tab => 
                tab.url && 
                (tab.url.includes('x.com/messages') || tab.url.includes('twitter.com/messages'))
            );

            if (existingTab) {
                // Focus the existing tab
                browser.tabs.update(existingTab.id, { 
                    active: true 
                });
                browser.windows.update(existingTab.windowId, { 
                    focused: true 
                });
            } else {
                // Create a new tab
                browser.tabs.create({
                    url: DM_URL
                });
            }
        });
});

// Listen for tab updates to ensure our content script is injected
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && 
        tab.url && 
        (tab.url.includes('x.com/messages') || tab.url.includes('twitter.com/messages'))) {
        // Refresh the content script if needed
        browser.tabs.sendMessage(tabId, { action: 'refresh' })
            .catch(() => {
                // If the content script isn't loaded yet, that's fine
                console.log('XDM: Content script not yet loaded');
            });
    }
});
