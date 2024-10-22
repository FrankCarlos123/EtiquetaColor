let currentIndex = 0;

function generateQR(text) {
    const qr = qrcode(0, 'L');
    qr.addData(text);
    qr.make();
    return qr.createDataURL(4);
}

function initializeRows() {
    const urlContainer = document.getElementById('urlInputs');
    const productContainer = document.getElementById('productInputs');
    const codeContainer = document.getElementById('codeInputs');
    const labelsContainer = document.getElementById('labelsContainer');
    
    let urlHtml = '', productHtml = '', codeHtml = '', labelsHtml = '';

    for (let i = 1; i <= 13; i++) {
        const number = String(i).padStart(2, '0');
        
        urlHtml += `
            <div class="input-group">
                <span class="input-number">${number}</span>
                <input type="text" class="input-field" id="url${number}" placeholder="URL de la imagen">
            </div>
        `;

        productHtml += `
            <div class="input-group">
                <span class="input-number">${number}</span>
                <input type="text" class="input-field" id="product${number}" placeholder="Nombre del producto">
            </div>
        `;

        codeHtml += `
            <div class="input-group">
                <span class="input-number">${number}</span>
                <input type="text" class="input-field" id="code${number}" placeholder="Código">
            </div>
        `;

        labelsHtml += `
            <div class="label-row">
                <div class="label-image">
                    <img id="labelImage${number}" src="" alt="">
                </div>
                <div class="label-name" id="labelName${number}"></div>
                <div class="label-qr">
                    <img id="labelQR${number}" src="" alt="QR">
                </div>
            </div>
        `;
    }

    urlContainer.innerHTML = urlHtml;
    productContainer.innerHTML = productHtml;
    codeContainer.innerHTML = codeHtml;
    labelsContainer.innerHTML = labelsHtml;
}

function processInputs() {
    for (let i = 1; i <= 13; i++) {
        const number = String(i).padStart(2, '0');
        const url = document.getElementById(`url${number}`).value.trim();
        const product = document.getElementById(`product${number}`).value.trim();
        const code = document.getElementById(`code${number}`).value.trim();

        if (url) {
            document.getElementById(`labelImage${number}`).src = url;
        }
        if (product) {
            document.getElementById(`labelName${number}`).textContent = product;
        }
        if (code) {
            document.getElementById(`labelQR${number}`).src = generateQR(code);
        }
    }
}

// Inicializar la página
window.onload = function() {
    initializeRows();
};