// Main JavaScript for Image2pixel Help Documentation

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Mobile navigation
    setupMobileNav();

    // Handle active links
    highlightActiveLink();

    // Initialize code highlighting if available
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
    
    // Setup language switcher
    setupLanguageSwitcher();
});

// Function to setup language switcher
function setupLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            const selectedLanguage = this.value;
            switchLanguage(selectedLanguage);
        });
        
        // Set initial language based on URL or browser preference
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        const currentPath = window.location.pathname;
        
        // Set appropriate language based on path or parameter
        if (currentPath.includes('/zh-CN/')) {
            languageSwitcher.value = 'zh-CN';
        } else if (currentPath.includes('/zh-TW/')) {
            languageSwitcher.value = 'zh-TW';
        } else if (langParam) {
            languageSwitcher.value = langParam;
        } else {
            // Default to English if no language indicators present
            languageSwitcher.value = 'en';
        }
    }
}

// Function to switch language
function switchLanguage(language) {
    // Get current path
    const currentPath = window.location.pathname;
    const currentFileName = currentPath.split('/').pop() || 'index.html';
    const isFileProtocol = window.location.protocol === 'file:';
    
    // Determine target path based on language
    let targetPath;
    
    if (language === 'en') {
        // If switching to English, go to the root path
        if (currentPath.includes('/zh-CN/') || currentPath.includes('/zh-TW/')) {
            if (isFileProtocol) {
                // For file:// protocol, construct the absolute path
                // Get the base path by removing the language directory and anything after it
                const basePath = currentPath.split(/\/zh-(CN|TW)\//)[0];
                targetPath = `${basePath}/index.html`;
            } else {
                // For Chinese to English with http protocol
                // Get the base directory structure
                const currentPathParts = currentPath.split('/');
                // Find the index of the zh-CN or zh-TW part
                const langIndex = currentPathParts.findIndex(part => part === 'zh-CN' || part === 'zh-TW');
                
                if (langIndex !== -1) {
                    // Remove the language part and everything before it
                    // Keep everything after it
                    const pathAfterLang = currentPathParts.slice(langIndex + 1).join('/');
                    
                    // If we're at the main page of a language
                    if (pathAfterLang === '' || pathAfterLang === 'index.html') {
                        // Go to the main English page
                        targetPath = '/';
                    } else {
                        // Go to the corresponding English page
                        targetPath = '/' + pathAfterLang;
                    }
                } else {
                    // Default to the homepage if the path structure is unexpected
                    targetPath = '/';
                }
            }
        } else {
            // Already on an English page
            targetPath = currentPath;
        }
    } else {
        // If switching to Chinese (Simplified or Traditional)
        if (currentPath.includes('/zh-CN/') || currentPath.includes('/zh-TW/')) {
            // Already in a language folder, just change language code
            targetPath = currentPath.replace(/\/(zh-CN|zh-TW)\//, '/' + language + '/');
        } else {
            if (isFileProtocol) {
                // For file:// protocol, construct the absolute path
                // Get the base directory
                const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
                targetPath = `${basePath}/${language}/index.html`;
            } else {
                // In the root directory with http protocol, add language prefix
                // Check if we're at the site root or a page in the root
                if (currentPath === '/' || currentPath === '' || currentFileName === 'index.html') {
                    // Main index page
                    targetPath = '/' + language + '/index.html';
                } else {
                    // For other pages in root, we need to handle both possibilities:
                    // 1. The site is at the domain root (e.g., example.com/page.html)
                    // 2. The site is in a subdirectory (e.g., example.com/docs/page.html)
                    
                    // First ensure we're working with a path without leading slash
                    let cleanPath = currentPath;
                    if (cleanPath.startsWith('/')) {
                        cleanPath = cleanPath.substring(1);
                    }
                    
                    targetPath = '/' + language + '/' + cleanPath;
                }
            }
        }
    }
    
    // Fix double slashes if any (except for the protocol part)
    targetPath = targetPath.replace(/([^:])\/+/g, '$1/');
    
    // If targetPath is empty, default to root
    if (!targetPath || targetPath === '') {
        targetPath = '/';
    }
    
    // Add language parameter to URL
    let url;
    if (isFileProtocol) {
        // For file:// URLs we need to construct the URL differently
        url = new URL(targetPath, window.location.href);
    } else {
        url = new URL(targetPath, window.location.origin);
    }
    url.searchParams.set('lang', language);
    
    // Navigate to the new URL
    window.location.href = url.toString();
}

// Function to perform search
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length < 2) {
        alert('Please enter at least 2 characters to search.');
        return;
    }
    
    // In a real implementation, this would search through documentation
    // For now, redirect to a hypothetical search results page
    window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
}

// Function to setup mobile navigation
function setupMobileNav() {
    // This would be used to handle mobile navigation in a more robust implementation
    // For example, implementing a hamburger menu for mobile devices
}

// Function to highlight the active link in navigation based on current page
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    
    // Find all links in the TOC
    document.querySelectorAll('.toc a').forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
            
            // Expand parent categories if any
            let parent = link.parentElement;
            while (parent) {
                if (parent.classList.contains('category')) {
                    parent.classList.add('expanded');
                }
                parent = parent.parentElement;
            }
        }
    });
}

// Utility function to create TOC from headings
function generateTableOfContents() {
    const content = document.querySelector('.content');
    const toc = document.createElement('div');
    toc.className = 'page-toc';
    toc.innerHTML = '<h3>On This Page</h3><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    const headings = content.querySelectorAll('h2, h3');
    
    headings.forEach((heading, index) => {
        // Add ID to the heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Insert TOC after the first heading
    const firstHeading = content.querySelector('h1');
    if (firstHeading && headings.length > 0) {
        firstHeading.after(toc);
    }
}

// Call TOC generation if the page has a content section with headings
if (document.querySelector('.content') && document.querySelectorAll('.content h2, .content h3').length > 0) {
    window.addEventListener('load', generateTableOfContents);
} 