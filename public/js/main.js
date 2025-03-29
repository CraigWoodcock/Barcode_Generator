// DOM Elements
const barcodeInput = document.getElementById('barcodeValue');
const barcodeName = document.getElementById('barcodeName');
const formatSelect = document.getElementById('barcodeFormat');
const maskCheckbox = document.getElementById('maskValue');
const errorDiv = document.getElementById('error');
const downloadBtn = document.getElementById('download');
const formatDescription = document.getElementById('formatDescription');
const barcodeNameDisplay = document.getElementById('barcodeName-display');
const barcodeValueDisplay = document.getElementById('barcodeValue-display');

const formatDescriptions = {
    CODE128: "Supports all ASCII characters including uppercase, lowercase, numbers, and symbols. Very versatile and commonly used in shipping and packaging.",
    CODE39: "Suitable for uppercase letters (A-Z), numbers, and some special characters (-, ., $, /, +, %, space). Commonly used in inventory and industrial applications.",
    EAN13: "13 digits long, used worldwide for retail products. Numbers only.",
    EAN8: "8 digits long, compact version of EAN-13. Numbers only.",
    UPC: "12 digits long, commonly used in North American retail. Numbers only."
};

formatSelect.addEventListener('change', updateFormatDescription);
barcodeInput.addEventListener('input', function() {
    if (maskCheckbox.checked) {
        this.type = 'password';
    }
});

maskCheckbox.addEventListener('change', function() {
    barcodeInput.type = this.checked ? 'password' : 'text';
});

function updateFormatDescription() {
    formatDescription.textContent = formatDescriptions[formatSelect.value];
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateFormatDescription();
    document.getElementById('generateBarcodeBtn').addEventListener('click', generateBarcode);
    document.getElementById('download').addEventListener('click', downloadBarcode);
});

// Add input validation
barcodeInput.addEventListener('input', validateInput);
formatSelect.addEventListener('change', () => {
    validateInput();
    updateFormatDescription();
});

function validateInput() {
    const value = barcodeInput.value;
    const format = formatSelect.value;
    
    // Basic format-specific validation
    let isValid = true;
    switch(format) {
        case 'CODE128':
            isValid = value.length > 0; // Accepts all characters
            break;
        case 'CODE39':
            isValid = /^[A-Z0-9\-\.\$\/\+\%\s]+$/.test(value);
            break;
        case 'EAN13':
            isValid = /^\d{13}$/.test(value);
            break;
        case 'EAN8':
            isValid = /^\d{8}$/.test(value);
            break;
        case 'UPC':
            isValid = /^\d{12}$/.test(value);
            break;
    }
    
    document.getElementById('generateBarcodeBtn').disabled = !isValid;
    errorDiv.textContent = isValid ? '' : 'Invalid input for selected format';
}

/**
 * Generates a barcode based on user input
 */
function generateBarcode() {
    if (!barcodeInput.value) {
        errorDiv.textContent = 'Please enter a value';
        return;
    }
    
    const value = barcodeInput.value;
    const format = formatSelect.value;
    const name = barcodeName.value;
    
    try {
        JsBarcode("#barcode", value, {
            format: format,
            width: 2,
            height: 100,
            displayValue: !maskCheckbox.checked  // Show value in SVG only when not masked
        });
        errorDiv.textContent = '';
        downloadBtn.style.display = 'inline-block';
        
        // Update displays
        barcodeNameDisplay.textContent = name;
        barcodeValueDisplay.textContent = ''; // Never show value below SVG
    } catch (e) {
        errorDiv.textContent = 'Invalid input for selected barcode format';
        downloadBtn.style.display = 'none';
    }
}

// Initialize format description
updateFormatDescription();

/**
 * Downloads the generated barcode as an SVG file
 */
function downloadBarcode() {
    const svg = document.getElementById('barcode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'barcode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Export functions for use in HTML
window.generateBarcode = generateBarcode;
window.downloadBarcode = downloadBarcode;