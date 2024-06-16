import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        filterAdsByCategory(category);
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', filterAds);
    }
});

async function filterAds() {
    const query = document.getElementById('search').value.toLowerCase();
    const adsContainer = document.getElementById('adsContainer');

    const querySnapshot = await getDocs(collection(db, "ads"));
    const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const filteredAds = ads.filter(ad => {
        return (
            ad.title.toLowerCase().includes(query) ||
            ad.description.toLowerCase().includes(query) ||
            ad.price.toString().includes(query) ||
            ad.category.toLowerCase().includes(query)
        );
    });

    adsContainer.innerHTML = '';
    renderAds(filteredAds);
}

async function filterAdsByCategory(category) {
    const adsContainer = document.getElementById('adsContainer');

    const querySnapshot = await getDocs(collection(db, "ads"));
    const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const filteredAds = ads.filter(ad => ad.category === category);

    adsContainer.innerHTML = '';
    renderAds(filteredAds);
}

async function renderAds(ads = null) {
    const adsContainer = document.getElementById('adsContainer');
    adsContainer.innerHTML = '';

    const querySnapshot = ads ? null : await getDocs(collection(db, "ads"));
    const adsToRender = ads || querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let row = document.createElement('div');
    row.classList.add('row');

    adsToRender.forEach((ad, index) => {
        const col = document.createElement('div');
        col.classList.add('col-md-3', 'mb-3');

        const adElement = document.createElement('div');
        adElement.classList.add('card', 'h-100');

        const imagesDiv = document.createElement('div');
        ad.images.forEach(imageSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.classList.add('card-img-top', 'img-thumbnail', 'mr-2');
            imgElement.style.maxWidth = '100%';
            imagesDiv.appendChild(imgElement);
        });
        adElement.appendChild(imagesDiv);

        const adDetails = document.createElement('div');
        adDetails.classList.add('card-body');
        adDetails.innerHTML = `
            <h5 class="card-title">${ad.title}</h5>
            <p class="card-text">${ad.description}</p>
            <p><strong>Kaina: </strong>${ad.price} EUR</p>
            <p><strong>Kategorija: </strong>${ad.category}</p>
            <a href="ad.html?id=${ad.id}" class="btn btn-info btn-sm">Peržiūrėti</a>
        `;

        adElement.appendChild(adDetails);
        col.appendChild(adElement);
        row.appendChild(col);

        if ((index + 1) % 4 === 0) {
            adsContainer.appendChild(row);
            const newRow = document.createElement('div');
            newRow.classList.add('row');
            row = newRow;
        }
    });

    adsContainer.appendChild(row);
}
