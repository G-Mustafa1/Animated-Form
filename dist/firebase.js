import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDd1jDFh7tQCMTjGYsU0VdyoX8ObTc2DIo",
    authDomain: "phone-verefication-2e9fc.firebaseapp.com",
    projectId: "phone-verefication-2e9fc",
    storageBucket: "phone-verefication-2e9fc.firebasestorage.app",
    messagingSenderId: "111744208629",
    appId: "1:111744208629:web:8a8f53fc038763bafc7fbc",
    measurementId: "G-50T5Y000JB"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const gm = 'Ghulam Mustafa';
export { app, auth, db, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setDoc, doc, getDoc, };
