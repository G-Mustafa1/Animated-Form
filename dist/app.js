import { auth, db, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc } from './firebase.js';
const contanir = document.querySelector('.contanir');
const singupBtn = document.querySelector('.singup-btn');
const loginBtn = document.querySelector('.login-btn');
const passwordShow = document.querySelectorAll('.password');
const showButtons = document.querySelectorAll('#show');
const signupForm = document.getElementById('signup-form');
const sig_name = document.getElementById('name');
const loginForm = document.getElementById('login-form');
const loader = document.getElementById('loader');
const contanir_box = document.getElementById('contanir');
const googleBtn = document.getElementById('google');
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
});
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formBtn = form.elements[3];
    const name = sig_name.value;
    const email = document.getElementById('email_sig').value;
    const password = document.getElementById('password_sig').value;
    formBtn.disabled = true;
    formBtn.innerText = 'Loading...';
    formBtn.style.cursor = 'not-allowed';
    formBtn.style.backgroundColor = 'blue';
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "name", user.uid), {
            name,
            email
        });
        Swal.fire({
            title: "success",
            text: "Signup successfully!",
            icon: "success"
        }).then(() => {
            window.location.reload();
        });
    }
    catch (error) {
        const errorMessage = error.message;
        Swal.fire({
            title: "error",
            text: errorMessage,
            icon: "error"
        });
    }
    finally {
        formBtn.disabled = false;
        formBtn.innerText = 'Sign Up';
        formBtn.style.cursor = 'pointer';
        formBtn.style.backgroundColor = '#7494ec';
    }
});
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formBtn = form.elements[2];
    const email = document.getElementById('email_log').value;
    const password = document.getElementById('password_log').value;
    formBtn.disabled = true;
    formBtn.innerText = 'Loading...';
    formBtn.style.cursor = 'not-allowed';
    formBtn.style.backgroundColor = 'blue';
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        Swal.fire({
            title: "success",
            text: "Loged in successfully!",
            icon: "success"
        });
        window.location.href = "../dashbord/index.html";
    }
    catch (error) {
        const errorMessage = error.message;
        Swal.fire({
            title: "error",
            text: errorMessage,
            icon: "error"
        });
    }
    finally {
        formBtn.disabled = false;
        formBtn.innerText = 'Log In';
        formBtn.style.cursor = 'pointer';
        formBtn.style.backgroundColor = '#7494ec';
    }
    loginForm.reset();
});
googleBtn.addEventListener('click', async () => {
    googleBtn.style.cursor = 'not-allowed';
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await setDoc(doc(db, "name", user.uid), {
            name: user.displayName,
            email: user.email
        }, { merge: true });
        Swal.fire({
            title: "success",
            text: "Logged in successfully!",
            icon: "success"
        });
        window.location.href = "../dashbord/index.html";
    }
    catch (error) {
        swal.fire({
            title: "error",
            text: error.message,
            icon: "error"
        });
    }
    finally {
        googleBtn.style.cursor = 'pointer';
    }
});
function formloader() {
    setTimeout(() => {
        loader.style.display = 'none';
        contanir_box.style.display = 'block';
    }, 1000);
}
window.addEventListener('load', formloader);
