import { auth, signOut } from "./firebase.js";
console.log('sg', signOut);
const nav_nam = document.getElementById('nav-nam');
const sing_out = document.getElementById('sing-out');
nav_nam.textContent = "Hello' Welcome !";
sing_out.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hy');
    signOut(auth).then(() => {
        // Sign-out successful.
        Swal.fire({
            title: "success",
            text: "Sign out successfully!",
            icon: "success"
        });
        console.log('Sign-out successful');
        window.location.href = '../index.html';
    }).catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        Swal.fire({
            title: "error",
            text: errorMessage,
            icon: "error"
        });
    });
});
