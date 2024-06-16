import { db } from "./firebase-config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", function() {
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    const isUploadPage = window.location.pathname.includes('upload.html');

    const adsContainer = document.getElementById('adsContainer');
    const loggedIn = true; // Čia priskiriate reikiamą prisijungimo būseną

    async function renderAds() {
        // Išvalome esamą turinį
        adsContainer.innerHTML = '';

        // Paimame skelbimus iš Firestore
        const querySnapshot = await getDocs(collection(db, "ads"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Existing ads:', ads);

        const row = document.createElement('div');
        row.classList.add('row');

        // Iteruojame per kiekvieną skelbimą ir sugeneruojame HTML
        ads.forEach((ad, index) => {
            const col = document.createElement('div');
            col.classList.add('col-md-3', 'mb-3');

            const adElement = document.createElement('div');
            adElement.classList.add('card', 'h-100');

            // Sukuriamas skelbimo elementas
            const imagesDiv = document.createElement('div');
            ad.images.forEach(imageSrc => {
                const imgElement = document.createElement('img');
                imgElement.src = imageSrc;
                imgElement.classList.add('card-img-top', 'img-thumbnail', 'mr-2');
                imgElement.style.maxWidth = '100%';
                imagesDiv.appendChild(imgElement);
            });
            adElement.appendChild(imagesDiv);

            // Title, Description, Price
            const adDetails = document.createElement('div');
            adDetails.classList.add('card-body');
            adDetails.innerHTML = `
                <h5 class="card-title">${ad.title}</h5>
                <p class="card-text">${ad.description}</p>
                <p><strong>Kaina: </strong>${ad.price} EUR</p>
                <p><strong>Kategorija: </strong>${ad.category}</p>
                <a href="ad.html?id=${ad.id}" class="btn btn-info btn-sm">Peržiūrėti</a>
            `;

            if (loggedIn && !isIndexPage) {
                adDetails.innerHTML += `
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${ad.id}">Ištrinti</button>
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${ad.id}">Redaguoti</button>
                `;
            }

            adElement.appendChild(adDetails);
            col.appendChild(adElement);
            row.appendChild(col);

            // Pridėti naują eilutę kas 4 skelbimai
            if ((index + 1) % 4 === 0) {
                adsContainer.appendChild(row);
                const newRow = document.createElement('div');
                newRow.classList.add('row');
                row = newRow;
            }
        });

        adsContainer.appendChild(row);
    }

    adsContainer.addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const adId = e.target.getAttribute('data-id');
            await deleteDoc(doc(db, "ads", adId));
            renderAds();
            console.log('Skelbimas sėkmingai ištrintas!');
        }
    });

    if (isIndexPage || isUploadPage) {
        renderAds();
    }

    if (isUploadPage) {
        const uploadForm = document.getElementById('uploadForm');

        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const category = document.getElementById('category').value;
            const files = document.getElementById('image').files;

            console.log("Form data:", { title, description, price, category, files });

            const newAd = {
                title: title,
                description: description,
                price: price,
                category: category,
                images: []
            };

            let imagesProcessed = 0;

            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = async function(event) {
                    newAd.images.push(event.target.result);
                    imagesProcessed++;

                    console.log("Image processed:", event.target.result);

                    if (imagesProcessed === files.length) {
                        try {
                            const docRef = await addDoc(collection(db, "ads"), newAd);
                            console.log("Document written with ID: ", docRef.id);
                            uploadForm.reset();
                            renderAds();
                            alert('Skelbimas sėkmingai įkeltas!');
                        } catch (e) {
                            console.error("Error adding document: ", e);
                        }
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        });
    }
});
