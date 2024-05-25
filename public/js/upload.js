/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/modules/upload.js ***!
  \*******************************/
document.addEventListener("DOMContentLoaded", function () {
  var isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
  var isUploadPage = window.location.pathname.includes('upload.html');
  var adsContainer = document.getElementById('adsContainer');

  // Funkcija skirta skelbimų parodymui
  function renderAds() {
    // Išvalome esamą turinį
    adsContainer.innerHTML = '';

    // Paimame skelbimus iš localStorage
    var ads = JSON.parse(localStorage.getItem('ads')) || [];
    console.log('Existing ads:', ads);

    // Iteruojame per kiekvieną skelbimą ir sugeneruojame HTML
    ads.forEach(function (ad) {
      var adElement = document.createElement('div');
      adElement.classList.add('card', 'mb-3');
      adElement.innerHTML = "\n                <div class=\"card-body\">\n                    <h3 class=\"card-title\">".concat(ad.title, "</h3>\n                    <p class=\"card-text\">").concat(ad.description, "</p>\n                    <p><strong>Kaina: </strong>").concat(ad.price, " EUR</p>\n                </div>\n            ");
      var imagesDiv = document.createElement('div');
      ad.images.forEach(function (imageSrc) {
        var imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.classList.add('img-thumbnail', 'mr-2');
        imgElement.style.maxWidth = '100px';
        imagesDiv.appendChild(imgElement);
      });
      adElement.appendChild(imagesDiv);
      adsContainer.appendChild(adElement);
    });
  }

  // Rodo esamus skelbimus puslapio atidarymo metu
  if (isIndexPage || isUploadPage) {
    renderAds();
  }
  if (isUploadPage) {
    var uploadForm = document.getElementById('uploadForm');

    // Pridedamo skelbimo funkcionalumas
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = document.getElementById('title').value;
      var description = document.getElementById('description').value;
      var price = document.getElementById('price').value;
      var files = document.getElementById('image').files;
      var newAd = {
        id: Date.now(),
        title: title,
        description: description,
        price: price,
        images: []
      };

      // Skaityti ir pridėti kiekvieną vaizdą
      var imagesProcessed = 0;
      for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          newAd.images.push(event.target.result);
          imagesProcessed++;

          // Kai visos nuotraukos yra įkeltos, įrašome naują skelbimą į localStorage
          if (imagesProcessed === files.length) {
            var ads = JSON.parse(localStorage.getItem('ads')) || [];
            ads.push(newAd);
            localStorage.setItem('ads', JSON.stringify(ads));

            // Išvalome formą
            uploadForm.reset();

            // Parodykite naujai pridėtą skelbimą
            renderAds();
            alert('Skelbimas sėkmingai įkeltas!');
          }
        };
        reader.readAsDataURL(files[i]);
      }
    });
  }
});
/******/ })()
;