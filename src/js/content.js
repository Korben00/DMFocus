// Debug function to help identify important elements
function debugElements() {
    // Try different possible selectors for the composer
    const possibleComposerSelectors = [
        '[data-testid="dmComposerTextInput"]',
        '[data-testid="DM_Rich_Text_Input"]',
        '[data-testid="dmComposerEditor"]',
        '[data-testid="tweetTextarea_0"]',
        '[role="textbox"]'
    ];

    console.log('=== DMFocus Debug: Searching for composer ===');
    possibleComposerSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        console.log(`\nSelector "${selector}":`);
        console.log(`Found ${elements.length} elements`);
        
        elements.forEach((element, index) => {
            console.log(`\nElement ${index + 1}:`);
            const styles = window.getComputedStyle(element);
            console.log('Properties:');
            console.log(`- Display: ${styles.display}`);
            console.log(`- Visibility: ${styles.visibility}`);
            console.log(`- Opacity: ${styles.opacity}`);
            
            // Check parent chain
            let parent = element.parentElement;
            let depth = 0;
            console.log('\nParent chain:');
            while (parent && depth < 5) {
                const parentStyles = window.getComputedStyle(parent);
                console.log(`\nLevel ${depth + 1} (${parent.tagName.toLowerCase()}):${parent.id ? ' #' + parent.id : ''}`);
                console.log(`- Display: ${parentStyles.display}`);
                console.log(`- Visibility: ${parentStyles.visibility}`);
                console.log(`- Opacity: ${parentStyles.opacity}`);
                console.log(`- Classes: ${parent.className}`);
                if (parent.dataset.testid) {
                    console.log(`- data-testid: ${parent.dataset.testid}`);
                }
                parent = parent.parentElement;
                depth++;
            }
        });
    });
}

// Create and inject the header
function createHeader() {
    const header = document.createElement('div');
    header.id = 'xdm-header';
    header.innerHTML = `
        <h1>DMFocus for X - No tweets, no ads - just DM | By <a href="https://korben.info" target="_blank" style="color: white; text-decoration: underline;">Korben</a></h1>
    `;
    document.body.insertBefore(header, document.body.firstChild);
}

// Ensure all DM-related elements are visible
function ensureVisibility() {
    // Force show any potential DM containers
    const selectors = [
        '[data-testid="DMDrawer"]',
        '[data-testid="primaryColumn"]',
        '[data-testid="DM_Conversation_Container"]',
        '[data-testid="DM_Conversation"]',
        '[data-testid="DMInbox"]',
        '[data-testid="DMComposer"]',
        '[role="textbox"]'
    ];

    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.setProperty('display', 'block', 'important');
            element.style.setProperty('visibility', 'visible', 'important');
            element.style.setProperty('opacity', '1', 'important');
            
            // Also ensure parent elements are visible
            let parent = element.parentElement;
            while (parent) {
                parent.style.setProperty('display', parent.style.display === 'none' ? 'block' : parent.style.display, 'important');
                parent.style.setProperty('visibility', 'visible', 'important');
                parent.style.setProperty('opacity', '1', 'important');
                parent = parent.parentElement;
            }
        }
    });
}

// Main function to clean the interface
function cleanInterface() {
    if (!document.getElementById('xdm-header')) {
        createHeader();
    }
    ensureVisibility();
    debugElements();
}

// Initialize the interface with a single observer
function initializeInterface() {
    // Initial cleanup
    cleanInterface();

    // Create a single observer for all changes
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        
        // Check if any relevant elements were added
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldUpdate = true;
                break;
            }
        }
        
        if (shouldUpdate) {
            console.log('DOM changed, updating interface...');
            cleanInterface();
        }
    });

    // Observe the entire document
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'data-testid']
    });

    console.log('DMFocus observer initialized');
}

// Start the extension
initializeInterface();
console.log('DMFocus for X: Content script loaded');
