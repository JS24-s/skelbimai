import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Naudokite Firebase konsolėje sugeneruotą konfigūraciją
const firebaseConfig = {
    apiKey: "AIzaSyCvr9t5rbNs2rhgMzgHE2oydsHkjow5B5k",
    authDomain: "skelbimu-puslapis-4fc42.firebaseapp.com",
    projectId: "skelbimu-puslapis-4fc42",
    storageBucket: "skelbimu-puslapis-4fc42.appspot.com",
    messagingSenderId: "376595467038",
    appId: "1:376595467038:web:a906533295c6769813570f",
  };

// Inicializuoti Firebase aplikacija
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
