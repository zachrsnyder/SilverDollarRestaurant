const fs = require('fs');
const path = require('path');

// Updated path for newer versions of pdfjs-dist
const workerPath = require.resolve('pdfjs-dist/legacy/build/pdf.worker.min.js');
// Define the destination path in your public directory
const destPath = path.join(__dirname, 'public', 'pdf.worker.min.js');

// Ensure the public directory exists
if (!fs.existsSync(path.dirname(destPath))) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
}

// Copy the file
fs.copyFileSync(workerPath, destPath);
console.log('PDF worker file copied successfully');