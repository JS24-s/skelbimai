/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/modules/upload.js ***!
  \*******************************/
document.addEventListener("DOMContentLoaded", function () {
  var isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
  var isUploadPage = window.location.pathname.includes('upload.html');
  var adsContainer = document.getElementById('adsContainer');
  var loggedIn = true; // Čia priskiriate reikiamą prisijungimo būseną
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
      // Sukuriamas skelbimo elementas
      var imagesDiv = document.createElement('div');
      ad.images.forEach(function (imageSrc) {
        var imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.classList.add('img-thumbnail', 'mr-2');
        imgElement.style.maxWidth = '100px';
        imagesDiv.appendChild(imgElement);
      });
      adElement.appendChild(imagesDiv);

      // Title, Description, Price
      var adDetails = document.createElement('div');
      adDetails.classList.add('card-body');
      adDetails.innerHTML = "\n                <h3 class=\"card-title\">".concat(ad.title, "</h3>\n                <p class=\"card-text\">").concat(ad.description, "</p>\n                <p><strong>Kaina: </strong>").concat(ad.price, " EUR</p>\n                \n            ");
      // Tik jei vartotojas yra prisijungęs ir ne pagrindiniame puslapyje, pridėkite mygtukus "Ištrinti" ir "Redaguoti"
      if (loggedIn && !isIndexPage) {
        adDetails.innerHTML += "\n                    <button class=\"btn btn-danger btn-sm delete-btn\" data-id=\"".concat(ad.id, "\">I\u0161trinti</button>\n                    <button class=\"btn btn-primary btn-sm edit-btn\" data-id=\"").concat(ad.id, "\">Redaguoti</button>\n                ");
      }
      adElement.appendChild(adDetails);
      adsContainer.appendChild(adElement);
    });
  }

  // Kodas palengvinantis skelbimų ištrynimą
  adsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      var adId = parseInt(e.target.getAttribute('data-id'));
      // Ištrinama skelbimo informacija iš localStorage
      var ads = JSON.parse(localStorage.getItem('ads')) || [];

      // Atnaujinamas skelbimų sąrašas, ištrinant pasirinktą skelbimą
      var updatedAds = ads.filter(function (ad) {
        return ad.id !== adId;
      });
      localStorage.setItem('ads', JSON.stringify(updatedAds));

      // Atvaizduojame atnaujintus skelbimus
      renderAds();

      // Patvirtinimas, kad skelbimas buvo sėkmingai ištrintas
      console.log('Skelbimas sėkmingai ištrintas!');
    }
  });

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