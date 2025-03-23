# Image2pixel Help Documentation

This directory contains the help documentation website for Image2pixel, a professional pixel art generator application.

## Structure

The documentation is organized into the following structure:

```
/help
├── index.html                   # Main documentation home page (English)
├── styles/                      # CSS styles
│   └── main.css                 # Main stylesheet
├── js/                          # JavaScript files
│   └── main.js                  # Main JavaScript file with language switching
├── images/                      # Image assets
├── zh-CN/                       # Simplified Chinese version
│   ├── index.html               # Main documentation (Simplified Chinese)
│   ├── version-history.html     # Version history (Simplified Chinese)
│   ├── basics/                  # Basic concepts (Simplified Chinese)
│   │   ├── faq.html             # FAQ (Simplified Chinese)
│   │   └── ...
│   └── algorithms/              # Algorithms (Simplified Chinese)
│       └── ...
├── zh-TW/                       # Traditional Chinese version
│   ├── index.html               # Main documentation (Traditional Chinese)
│   ├── version-history.html     # Version history (Traditional Chinese)
│   ├── basics/                  # Basic concepts (Traditional Chinese)
│   │   ├── faq.html             # FAQ (Traditional Chinese)
│   │   └── ...
│   └── algorithms/              # Algorithms (Traditional Chinese)
│       └── ...
├── basics/                      # Basic concepts and guides (English)
│   ├── faq.html                 # Frequently Asked Questions
│   ├── quick-reference.html     # Quick reference guide
│   └── interface.html           # Interface guide
├── animation/                   # Animation documentation
│   └── transparency.html        # Transparency support
└── algorithms/                  # Pixelation algorithms
    ├── standard.html            # Standard algorithm
    ├── slic.html                # SLIC algorithm
    └── color-palettes.html      # Color palettes

```

## Multilingual Support

The documentation is available in three languages:
- English (default)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)

Language switching is implemented through a dropdown menu in the header. Each language has its own directory with translated content that mirrors the English version's structure.

## Development

The documentation is built using standard HTML, CSS, and JavaScript. To modify or extend the documentation:

1. Edit the HTML files in the respective directories
2. Update the styles in the `styles/main.css` file
3. Add or modify JavaScript functionality in the `js/main.js` file
4. When adding new pages, remember to create versions for all supported languages

### Adding a New Page

To add a new documentation page:

1. Create a new HTML file in the appropriate directory for English content
2. Create corresponding files in the zh-CN and zh-TW directories with translated content
3. Use the existing page template structure
4. Update the sidebar navigation in all pages to include the new page

### Adding a New Language

To add a new language:

1. Create a new directory with the appropriate language code (e.g., `ja-JP` for Japanese)
2. Copy the English version files into this directory
3. Translate the content
4. Add the language option to the language switcher dropdown in all HTML files
5. Update the language detection logic in `js/main.js`

## Serving the Documentation

The documentation can be served as static files from any web server. For local development, you can use:

```bash
# Using Python's built-in HTTP server
python -m http.server

# Using Node.js
npx serve
```

Then access the documentation at `http://localhost:8000` (or the port specified by your server).

## Updating Images

Place all image assets in the `images/` directory. Reference them using relative paths:

```html
<img src="../images/filename.png" alt="Description">
```

## Contact

For questions regarding the documentation, please contact Pixel Bear Teacher:

- Email: 32@32comic.com