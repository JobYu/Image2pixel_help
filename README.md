# Image2pixel Help Documentation

This directory contains the help documentation website for Image2pixel, a professional pixel art generator application.

## Structure

The documentation is organized into the following structure:

```
/help
├── index.html               # Main documentation home page
├── styles/                  # CSS styles
│   └── main.css             # Main stylesheet
├── js/                      # JavaScript files
│   └── main.js              # Main JavaScript file
├── images/                  # Image assets
├── basics/                  # Basic concepts and guides
│   ├── faq.html             # Frequently Asked Questions
│   ├── quick-reference.html # Quick reference guide
│   └── interface.html       # Interface guide
├── animation/               # Animation documentation
│   └── transparency.html    # Transparency support
└── algorithms/              # Pixelation algorithms
    ├── standard.html        # Standard algorithm
    ├── slic.html            # SLIC algorithm
    └── color-palettes.html  # Color palettes

```

## Development

The documentation is built using standard HTML, CSS, and JavaScript. To modify or extend the documentation:

1. Edit the HTML files in the respective directories
2. Update the styles in the `styles/main.css` file
3. Add or modify JavaScript functionality in the `js/main.js` file

### Adding a New Page

To add a new documentation page:

1. Create a new HTML file in the appropriate directory
2. Use the existing page template structure
3. Update the sidebar navigation in all pages to include the new page

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