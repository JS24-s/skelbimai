import 'bootstrap/dist/js/bootstrap';
import $ from 'jquery';
import { createPopper } from '@popperjs/core'; // Importuojame teisingą `createPopper` funkciją
import { auth } from "./firebase-config";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

window.Popper = { createPopper };
window.$ = window.jQuery = $;

const currentUser = JSON.parse(localStorage.getItem('user'));
console.log('Current User:', currentUser);

function renderHeader() {
    console.log('Rendering header');
    $('#header').empty();

    if (currentUser && currentUser.email) {
        if (currentUser.email === "admin@example.com") {
            console.log('User is admin');
            $('#header').html(`
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="index.html">Skelbimų puslapis</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="index.html">Pagrindinis</a></li>
                            <li class="nav-item"><a class="nav-link" href="admin.html">Admin Panel</a></li>
                            <li class="nav-item"><a class="nav-link" id="logoutLink" href="#">Atsijungti</a></li>
                        </ul>
                    </div>
                </nav>
            `);
        } else {
            console.log('User is regular');
            $('#header').html(`
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="index.html">Skelbimų puslapis</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="index.html">Pagrindinis</a></li>
                            <li class="nav-item"><a class="nav-link" href="upload.html">Įkelti skelbimą</a></li>
                            <li class="nav-item"><a class="nav-link" id="logoutLink" href="#">Atsijungti</a></li>
                        </ul>
                    </div>
                </nav>
            `);
        }

        $('#logoutLink').on('click', async () => {
            try {
                await signOut(auth);
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Atsijungimo klaida:', error);
                alert('Atsijungimo klaida: ' + error.message);
            }
        });
    } else {
        console.log('User is not logged in');
        $('#header').html(`
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="index.html">Skelbimų puslapis</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="index.html">Pagrindinis</a></li>
                        <li class="nav-item"><a class="nav-link" href="login.html">Prisijungti</a></li>
                        <li class="nav-item"><a class="nav-link" href="register.html">Registruotis</a></li>
                    </ul>
                </div>
            </nav>
        `);
    }
}

$(document).ready(function() {
    console.log('Document ready');
    renderHeader();

    const currentPath = window.location.pathname;
    console.log('Current Path:', currentPath);

    if (currentPath.includes('login.html')) {
        $('#loginForm').on('submit', async function(e) {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Prisijungta:', user.email);
                localStorage.setItem('user', JSON.stringify({ email: user.email }));
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Prisijungimo klaida:', error);
                alert('Prisijungimo klaida: ' + error.message);
            }
        });
    } else if (currentPath.includes('register.html')) {
        $('#registerForm').on('submit', async function(e) {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Registruota:', user.email);
                alert('Registracija sėkminga, dabar galite prisijungti.');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Registracijos klaida:', error);
                alert('Registracijos klaida: ' + error.message);
            }
        });
    } else if (currentPath.includes('upload.html') && currentUser) {
        $('#uploadForm').on('submit', function(e) {
            e.preventDefault();
            const title = $('#title').val();
            const description = $('#description').val();
            const price = $('#price').val();
            const files = $('#image')[0].files;

            let ads = JSON.parse(localStorage.getItem('ads')) || [];
            let newAd = {
                id: ads.length + 1,
                title: title,
                description: description,
                images: [],
                price: price,
                user: currentUser.email
            };

            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = function(event) {
                    newAd.images.push(event.target.result);
                    if (newAd.images.length === files.length) {
                        ads.push(newAd);
                        localStorage.setItem('ads', JSON.stringify(ads));
                        alert('Skelbimas sėkmingai įkeltas!');
                        window.location.href = 'index.html';
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        });
    }
});
//veikia