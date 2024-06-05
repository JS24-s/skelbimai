document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is ready");

    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const isUploadPage = window.location.pathname.includes('upload.html');

    const adsContainer = document.getElementById('adsContainer');
    const loggedIn = true;

    function renderAds() {
        adsContainer.innerHTML = '';
        const ads = JSON.parse(localStorage.getItem('ads')) || [];
        console.log('Existing ads:', ads);

        ads.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.classList.add('card', 'mb-3');
            
            const imagesDiv = document.createElement('div');
            ad.images.forEach(imageSrc => {
                const imgElement = document.createElement('img');
                imgElement.src = imageSrc;
                imgElement.classList.add('img-thumbnail', 'mr-2');
                imgElement.style.maxWidth = '100px';
                imagesDiv.appendChild(imgElement);
            });
            adElement.appendChild(imagesDiv);

            const adDetails = document.createElement('div');
            adDetails.classList.add('card-body');
            adDetails.innerHTML = `
                <h3 class="card-title">${ad.title}</h3>
                <p class="card-text">${ad.description}</p>
                <p><strong>Kaina: </strong>${ad.price} EUR</p>
            `;

            if (loggedIn && !isIndexPage) {
                adDetails.innerHTML += `
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${ad.id}">Ištrinti</button>
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${ad.id}">Redaguoti</button>
                `;
            }

            adElement.appendChild(adDetails);
            adsContainer.appendChild(adElement);
        });
    }

    adsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const adId = parseInt(e.target.getAttribute('data-id'));
            const ads = JSON.parse(localStorage.getItem('ads')) || [];
            const updatedAds = ads.filter(ad => ad.id !== adId);
            localStorage.setItem('ads', JSON.stringify(updatedAds));
            renderAds();
            console.log('Skelbimas sėkmingai ištrintas!');
        }
    });

    if (isIndexPage || isUploadPage) {
        renderAds();
    }

    if (isUploadPage) {
        const uploadForm = document.getElementById('uploadForm');
        console.log("Upload form found:", uploadForm);

        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submitted");

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const year = document.getElementById('year').value;
            const make = document.getElementById('make').value;
            const model = document.getElementById('model').value;
            const mileage = document.getElementById('mileage').value;
            const engine = document.getElementById('engine').value;
            const color = document.getElementById('color').value;
            const images = [
                document.getElementById('image1').files[0],
                document.getElementById('image2').files[0],
                document.getElementById('image3').files[0]
            ];

            const newAd = {
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

            let imagesProcessed = 0;

            images.forEach(image => {
                if (image) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        newAd.images.push(event.target.result);
                        imagesProcessed++;

                        if (imagesProcessed === images.filter(img => img).length) {
                            const ads = JSON.parse(localStorage.getItem('ads')) || [];
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
                const ads = JSON.parse(localStorage.getItem('ads')) || [];
                ads.push(newAd);
                localStorage.setItem('ads', JSON.stringify(ads));
                uploadForm.reset();
                renderAds();
                alert('Skelbimas sėkmingai įkeltas!');
            }
        });
    }
});
