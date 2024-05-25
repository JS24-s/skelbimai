import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";



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