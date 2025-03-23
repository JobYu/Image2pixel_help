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
});

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