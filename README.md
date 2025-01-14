# Barcode Generator

A lightweight, browser-based barcode generator that creates and exports SVG barcodes. Built with vanilla JavaScript and the JsBarcode library, this tool runs entirely client-side and can be hosted on GitHub Pages.

## Features

- Generate barcodes in multiple formats:
  - CODE128 (default)
  - EAN-13
  - EAN-8
  - UPC
  - CODE39
- Real-time barcode preview
- SVG export functionality
- Input validation with error handling
- Responsive design
- No server-side processing required

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [JsBarcode](https://github.com/lindell/JsBarcode) - v3.11.5

## Demo

Access the live demo at: `https://CraigWoodcock.github.io/barcode-generator`

## Installation

1. Clone the repository:
```bash
git clone https://CraigWoodcock.github.io/barcode-generator
```

2. Navigate to the project directory:
```bash
cd barcode-generator
```

3. Open `index.html` in your browser to run locally, or deploy to GitHub Pages.

## Deployment

To deploy on GitHub Pages:

1. Go to your repository settings
2. Navigate to the "Pages" section
3. Select the main branch as the source
4. Save the changes

The site will be published at `https://[your-username].github.io/barcode-generator`

## Usage

1. Enter the desired value in the input field
2. Select the barcode format from the dropdown menu
3. Click "Generate Barcode" to create the barcode
4. Click "Download SVG" to save the generated barcode

## Limitations

- Requires JavaScript to be enabled in the browser
- Each barcode format has specific input requirements:
  - EAN-13: Exactly 12 or 13 numeric digits
  - EAN-8: Exactly 7 or 8 numeric digits
  - UPC: Exactly 11 or 12 numeric digits
  - CODE39: Uppercase letters, numbers, and some special characters
  - CODE128: All ASCII characters

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [JsBarcode](https://github.com/lindell/JsBarcode) for the barcode generation library