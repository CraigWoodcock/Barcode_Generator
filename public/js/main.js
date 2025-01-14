// DOM Elements
const barcodeInput = document.getElementById('barcodeValue');
const formatSelect = document.getElementById('barcodeFormat');
const errorDiv = document.getElementById('error');
const downloadBtn = document.getElementById('download');

/**
 * Generates a barcode based on user input
 */
function generateBarcode() {
    const value = barcodeInput.value;
    const format = formatSelect.value;
    
    try {
        JsBarcode("#barcode", value, {
            format: format,
            width: 2,
            height: 100,
            displayValue: true
        });
        errorDiv.textContent = '';
        downloadBtn.style.display = 'inline-block';
    } catch (e) {
        errorDiv.textContent = 'Invalid input for selected barcode format';
        downloadBtn.style.display = 'none';
    }
}

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