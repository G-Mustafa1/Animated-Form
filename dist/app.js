const contanir = document.querySelector('.contanir');
const singupBtn = document.querySelector('.singup-btn');
const loginBtn = document.querySelector('.login-btn');
const passwordShow = document.querySelectorAll('.password');
const showButtons = document.querySelectorAll('#show');
const signupForm = document.getElementById('signup-form');
const sig_name = document.getElementById('name');
const loginForm = document.getElementById('login-form');
singupBtn.addEventListener('click', () => {
    contanir.classList.add('active');
});
loginBtn.addEventListener('click', () => {
    contanir.classList.remove('active');
});
showButtons.forEach((hy) => {
    // console.log(hy,'ho' ,index)
    hy.addEventListener('click', () => {
        passwordShow.forEach((inu) => {
            // console.log(inu.value,'hy')
            if (inu.type === 'password') {
                inu.type = 'text';
                hy.classList.remove('fa-eye');
                hy.classList.add('fa-eye-slash');
            }
            else {
                inu.type = 'password';
                hy.classList.add('fa-eye');
                hy.classList.remove('fa-eye-slash');
            }
        });
    });
    // shoW.addEventListener('click',(hy) => {
    //    console.log(hy,'hy');
    // })
});
// import {app,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "./firebase";
// console.log(createUserWithEmailAndPassword)
// console.log(auth)
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from './firebase.js';
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_sig').value;
    const password = document.getElementById('password_sig').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        Swal.fire({
            title: "success",
            text: "Signed up successfully!",
            icon: "success"
        }).then(() => {
            window.location.reload();
        });
    })
        .catch((error) => {
        //  const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Swal.fire({
            title: "error",
            text: errorMessage,
            icon: "error"
        });
        // ..
    });
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_log').value;
    const password = document.getElementById('password_log').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        Swal.fire({
            title: "success",
            text: "Loged in successfully!",
            icon: "success"
        });
        console.log(user);
        //   window.location.href = "./dashbord.html"
        window.location.href = "../dashbord/index.html";
    })
        .catch((error) => {
        //  const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
            title: "error",
            text: errorMessage,
            icon: "error"
        });
    });
    loginForm.reset();
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid, 'user loged in');
    }
    else {
        // User is signed out
        //  window.location.href = '../index.html'
    }
});
export { sig_name };
