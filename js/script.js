// Get elements
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const spinner = document.getElementById("spinner");
const downloadDiv = document.getElementById("download");

const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const resultSection = document.getElementById("result-section");

// Generate QR using API
function generateQRCode(url, size) {
  qr.innerHTML = "";
  downloadDiv.innerHTML = "";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`;
  const img = document.createElement("img");

  img.src = qrUrl;
  img.alt = "QR Code";
  qr.appendChild(img);
  createSaveBtn(qrUrl);
}

// Show spinner
function showSpinner() {
  spinner.style.display = "block";
}

// Hide spinner
function hideSpinner() {
  spinner.style.display = "none";
}

// Create download button
function createSaveBtn(url) {
  const btn = document.createElement("a");
  btn.href = url;
  btn.download = "qrcode";
  btn.innerText = "Download QR Code";
  btn.classList.add("download-btn");
  downloadDiv.appendChild(btn);
}

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  showSpinner();

  setTimeout(() => {
    hideSpinner();
    generateQRCode(url, size);
    resultSection.style.display = "block";
    generateBtn.disabled = true;
    resetBtn.style.display = "inline-block";
  }, 500);

});

// Reset
resetBtn.addEventListener("click", function () {
  qr.innerHTML = "";
  downloadDiv.innerHTML = "";
  resultSection.style.display = "none";
  generateBtn.disabled = false;
  resetBtn.style.display = "none";
  form.reset();
});