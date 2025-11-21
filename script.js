// OCR Extractor Tool JavaScript
const imageInput = document.getElementById('imageInput');
const urlInput = document.getElementById('urlInput');
const urlBtn = document.getElementById('urlBtn');
const preview = document.getElementById('preview');
const previewContainer = document.getElementById('previewContainer');
const extractBtn = document.getElementById('extractBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultsContainer = document.getElementById('resultsContainer');
const outputText = document.getElementById('outputText');
const confidenceValue = document.getElementById('confidenceValue');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const searchBtn = document.getElementById('searchBtn');
const uploadArea = document.getElementById('uploadArea');
const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const clearBtn = document.getElementById('clearBtn');

let currentImage = null;

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-moon';
        themeText.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-sun';
        themeText.textContent = 'Dark Mode';
    }
});

// Clear image function
clearBtn.addEventListener('click', () => {
    imageInput.value = '';
    urlInput.value = '';
    currentImage = null;
    previewContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    outputText.value = 'Welcome to OCR Pro!\n\nUpload an image or provide a URL to extract text from images with ease.\n\nSupported formats: JPG, PNG, GIF, BMP';
    confidenceValue.textContent = 'Ready';
    progressContainer.style.display = 'none';
    extractBtn.disabled = false;
    extractBtn.innerHTML = '<i class="fas fa-magic"></i> Extract Text';
    showAlert('Image cleared!', 'info');
});

// Handle upload area click
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

// Handle drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        imageInput.files = files;
        imageInput.dispatchEvent(new Event('change'));
    }
});

// Initialize results container visible with welcome message
resultsContainer.style.display = 'block';
outputText.value = 'Welcome to OCR Pro!\n\nUpload an image or provide a URL to extract text from images with ease.\n\nSupported formats: JPG, PNG, GIF, BMP';
confidenceValue.textContent = 'Ready';

// Handle file upload
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            preview.src = evt.target.result;
            previewContainer.style.display = 'block';
            currentImage = evt.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle image URL
urlBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
        preview.onload = () => {
            currentImage = url;
            previewContainer.style.display = 'block';
            showAlert('Image loaded from URL!', 'success');
        };
        preview.onerror = () => {
            showAlert('Failed to load image from URL. Please check the URL and try again.', 'danger');
        };
        preview.src = url;
    }
});

// OCR Extraction
extractBtn.addEventListener('click', () => {
    if (!currentImage) {
        alert('Please select or load an image first.');
        return;
    }

    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressText.textContent = 'Initializing OCR...';
    extractBtn.disabled = true;
    extractBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    Tesseract.recognize(
        currentImage,
        'eng',
        {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const progress = Math.round(m.progress * 100);
                    progressBar.style.width = progress + '%';
                    progressText.textContent = `Recognizing text... ${progress}%`;
                }
            }
        }
    ).then(({ data: { text, confidence } }) => {
        outputText.value = text;
        confidenceValue.textContent = Math.round(confidence) + '%';
        resultsContainer.style.display = 'block';
        progressContainer.style.display = 'none';
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<i class="fas fa-magic"></i> Extract Text';
        // Success animation
        extractBtn.classList.add('success-animation');
        setTimeout(() => extractBtn.classList.remove('success-animation'), 600);
        showAlert('Text extracted successfully!', 'success');
    }).catch(err => {
        outputText.value = 'Error: ' + err.message;
        resultsContainer.style.display = 'block';
        progressContainer.style.display = 'none';
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<i class="fas fa-magic"></i> Extract Text';
        showAlert('OCR failed. Please try again.', 'danger');
    });
});

// Copy extracted text
copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    // Bootstrap toast or alert
    showAlert('Text copied to clipboard!', 'success');
});

// Download as TXT
downloadBtn.addEventListener('click', () => {
    const text = outputText.value;
    if (!text) {
        showAlert('No text to download!', 'warning');
        return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_text.txt';
    a.click();
    URL.revokeObjectURL(url);
    showAlert('Text downloaded as TXT file!', 'success');
});

// Search text
searchBtn.addEventListener('click', () => {
    const query = outputText.value.trim();
    if (query) {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    } else {
        showAlert('No text to search!', 'warning');
    }
});

// Show alert function
function showAlert(message, type) {
    const isLight = document.body.classList.contains('light-mode');
    const themeClass = isLight ? 'alert-light' : 'alert-dark';
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed ${themeClass}`;
    alertDiv.style.cssText = 'bottom: 20px; right: 20px; z-index: 9; min-width: 300px; border-radius: 16px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" style="filter: ${isLight ? 'none' : 'invert(1)'}"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}