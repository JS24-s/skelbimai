import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//login existing user
const login = () =>{
  const login_email = document.getElementById('login_email').value;
  const login_password = document.getElementById('login_password').value;

  signInWithEmailAndPassword(auth, login_email, login_password)
  .then((userCredential)=>{
    //sign in
    const user = userCredential.user;
    const loginTime = new Date();
    update(ref(database, 'users/' + user.uid), {
      last_login: loginTime
    });
    console.log(user, "Login successful!");
  })
  .catch((error) =>{
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}


//geting signed-in user
const user = auth.currentUser;
onAuthStateChanged(auth, (user)=>{
    if (user){
        const uid = user.uid;
    } else {

    }
});
//sign-out
document.getElementById('signOut').addEventListener('click', ()=>{
    signOut(auth).then(()=>{
        //sign-out successful.
        alert('Sign-out successful!')
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('login').addEventListener('click', login);
});
