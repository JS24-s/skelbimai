/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/modules/upload.js ***!
  \*******************************/
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready");
  var isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
  var isUploadPage = window.location.pathname.includes('upload.html');
  var adsContainer = document.getElementById('adsContainer');
  var loggedIn = true;
  function renderAds() {
    adsContainer.innerHTML = '';
    var ads = JSON.parse(localStorage.getItem('ads')) || [];
    console.log('Existing ads:', ads);
    ads.forEach(function (ad) {
      var adElement = document.createElement('div');
      adElement.classList.add('card', 'mb-3');
      var imagesDiv = document.createElement('div');
      ad.images.forEach(function (imageSrc) {
        var imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.classList.add('img-thumbnail', 'mr-2');
        imgElement.style.maxWidth = '100px';
        imagesDiv.appendChild(imgElement);
      });
      adElement.appendChild(imagesDiv);
      var adDetails = document.createElement('div');
      adDetails.classList.add('card-body');
      adDetails.innerHTML = "\n                <h3 class=\"card-title\">".concat(ad.title, "</h3>\n                <p class=\"card-text\">").concat(ad.description, "</p>\n                <p><strong>Kaina: </strong>").concat(ad.price, " EUR</p>\n            ");
      if (loggedIn && !isIndexPage) {
        adDetails.innerHTML += "\n                    <button class=\"btn btn-danger btn-sm delete-btn\" data-id=\"".concat(ad.id, "\">I\u0161trinti</button>\n                    <button class=\"btn btn-primary btn-sm edit-btn\" data-id=\"").concat(ad.id, "\">Redaguoti</button>\n                ");
      }
      adElement.appendChild(adDetails);
      adsContainer.appendChild(adElement);
    });
  }
  adsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      var adId = parseInt(e.target.getAttribute('data-id'));
      var ads = JSON.parse(localStorage.getItem('ads')) || [];
      var updatedAds = ads.filter(function (ad) {
        return ad.id !== adId;
      });
      localStorage.setItem('ads', JSON.stringify(updatedAds));
      renderAds();
      console.log('Skelbimas sėkmingai ištrintas!');
    }
  });
  if (isIndexPage || isUploadPage) {
    renderAds();
  }
  if (isUploadPage) {
    var uploadForm = document.getElementById('uploadForm');
    console.log("Upload form found:", uploadForm);
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log("Form submitted");
      var title = document.getElementById('title').value;
      var description = document.getElementById('description').value;
      var price = document.getElementById('price').value;
      var year = document.getElementById('year').value;
      var make = document.getElementById('make').value;
      var model = document.getElementById('model').value;
      var mileage = document.getElementById('mileage').value;
      var engine = document.getElementById('engine').value;
      var color = document.getElementById('color').value;
      var images = [document.getElementById('image1').files[0], document.getElementById('image2').files[0], document.getElementById('image3').files[0]];
      var newAd = {
        id: Date.now(),
        title: title,
        description: description,
        price: price,
        year: year,
        make: make,
        model: model,
        mileage: mileage,
        engine: engine,
        color: color,
        images: []
      };
      console.log("New ad created:", newAd);
      var imagesProcessed = 0;
      images.forEach(function (image) {
        if (image) {
          var reader = new FileReader();
          reader.onload = function (event) {
            newAd.images.push(event.target.result);
            imagesProcessed++;
            if (imagesProcessed === images.filter(function (img) {
              return img;
            }).length) {
              var ads = JSON.parse(localStorage.getItem('ads')) || [];
              ads.push(newAd);
              localStorage.setItem('ads', JSON.stringify(ads));
              uploadForm.reset();
              renderAds();
              alert('Skelbimas sėkmingai įkeltas!');
            }
          };
          reader.readAsDataURL(image);
        } else {
          imagesProcessed++;
        }
      });
      if (imagesProcessed === images.length) {
        var ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads.push(newAd);
        localStorage.setItem('ads', JSON.stringify(ads));
        uploadForm.reset();
        renderAds();
        alert('Skelbimas sėkmingai įkeltas!');
      }
    });
  }
});
/******/ })()
;