const fileInput = document.getElementById('file-input');
const previewImg = document.getElementById('preview-img');
const previewIcon = document.getElementById('preview-icon');
const previewText = document.getElementById('preview-text');
const errorMsg = document.getElementById('errorMsg');
const fileName = document.getElementById('file-name');
const fileSize = document.getElementById('file-size');
const fileType = document.getElementById('file-type');
const clearBtn = document.getElementById('clear-btn');

const acceptedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if(!file) return

    //kollar om filtypen är giltig
    if(!acceptedFormats.includes(file.type)) {
        errorMsg.textContent = 'Invalid file type. Please use .jpg, .png or .svg';
        resetPreview();
        return;
    }

    errorMsg.textContent = '';

    //uppdaterar info för filer
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(1) + 'KB';
    fileType.textContent = file.type;

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
        previewIcon.style.display = 'none';
        previewText.style.display = 'none';
    }
    reader.readAsDataURL(file);
});

clearBtn.addEventListener('click', () => {
    fileInput.value = '';
    errorMsg.textContent = '';
    resetPreview();
    fileName.textContent = '-';
    fileSize.textContent = '-';
    fileType.textContent = '-';
})

const resetPreview = () => {
    previewImg.style.display = 'none';
    previewImg.src = '';
    previewIcon.style.display = 'block';
    previewText.style.display = 'block';
}