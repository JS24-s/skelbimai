document.addEventListener("DOMContentLoaded", function() {
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const isUploadPage = window.location.pathname.includes('upload.html');

    const adsContainer = document.getElementById('adsContainer');

    // Funkcija skirta skelbimų parodymui
    function renderAds() {
        // Išvalome esamą turinį
        adsContainer.innerHTML = '';

        // Paimame skelbimus iš localStorage
        const ads = JSON.parse(localStorage.getItem('ads')) || [];
        console.log('Existing ads:', ads);

        // Iteruojame per kiekvieną skelbimą ir sugeneruojame HTML
        ads.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.classList.add('card', 'mb-3');
            adElement.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title">${ad.title}</h3>
                    <p class="card-text">${ad.description}</p>
                    <p><strong>Kaina: </strong>${ad.price} EUR</p>
                </div>
            `;

            const imagesDiv = document.createElement('div');
            ad.images.forEach(imageSrc => {
                const imgElement = document.createElement('img');
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
        const uploadForm = document.getElementById('uploadForm');

        // Pridedamo skelbimo funkcionalumas
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const files = document.getElementById('image').files;

            const newAd = {
                id: Date.now(),
                title: title,
                description: description,
                price: price,
                images: []
            };

            // Skaityti ir pridėti kiekvieną vaizdą
            let imagesProcessed = 0;

            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    newAd.images.push(event.target.result);
                    imagesProcessed++;

                    // Kai visos nuotraukos yra įkeltos, įrašome naują skelbimą į localStorage
                    if (imagesProcessed === files.length) {
                        const ads = JSON.parse(localStorage.getItem('ads')) || [];
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
