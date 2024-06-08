import { db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    console.log("Ad ID from URL:", adId);

    if (adId) {
        try {
            const adDoc = await getDoc(doc(db, "ads", adId));
            if (adDoc.exists()) {
                const ad = adDoc.data();

                const adContainer = document.getElementById('adContainer');
                adContainer.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <h3>${ad.title}</h3>
                        </div>
                        <div class="card-body">
                            <p>${ad.description}</p>
                            <p><strong>Kaina: </strong>${ad.price} EUR</p>
                            <div id="imagesContainer">
                                ${ad.images.map(imageSrc => `<img src="${imageSrc}" class="img-thumbnail" style="max-width: 300px;">`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    } else {
        console.log("No Ad ID provided in URL");
    }
});
