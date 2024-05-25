import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvr9t5rbNs2rhgMzgHE2oydsHkjow5B5k",
  authDomain: "skelbimu-puslapis-4fc42.firebaseapp.com",
  projectId: "skelbimu-puslapis-4fc42",
  storageBucket: "skelbimu-puslapis-4fc42.appspot.com",
  messagingSenderId: "376595467038",
  appId: "1:376595467038:web:a906533295c6769813570f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const registerNewUser = (event) => {
  event.preventDefault(); // Prevent form submission

  const register_email = document.getElementById('register_email').value;
  const register_password = document.getElementById('register_password').value;

  createUserWithEmailAndPassword(auth, register_email, register_password)
    .then((userCredential) => {
      alert("Signup Successfully")
      const user = userCredential.user;
      const loginTime = new Date()
      set(ref(database, 'users/' + user.uid), {
        email: register_email,
        role: "simple_user",
        timestamp: `${loginTime}`
          
      });
      console.log("User registered successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('registerForm').addEventListener('submit', registerNewUser);
});


 









//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       alert("Creating Account...");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//     });
// });

$(document).ready(function () {
  // Rodyti prisijungimo modalą
  $("#loginBtn").click(function () {
    $("#loginModal").modal("show");
  });

  // Rodyti registracijos modalą
  $("#registerBtn").click(function () {
    $("#registerModal").modal("show");
  });

  // Prisijungimo forma
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    // Čia būtų prisijungimo veiksmai
  });

  // Registracijos forma
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    // Čia būtų registracijos veiksmai
  });
});
