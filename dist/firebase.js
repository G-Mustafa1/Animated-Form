import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCw5cTkanxEBU-rIlDiK2eWDkV2PN_CvJw",
    authDomain: "loginsingup-72ff1.firebaseapp.com",
    projectId: "loginsingup-72ff1",
    storageBucket: "loginsingup-72ff1.firebasestorage.app",
    messagingSenderId: "670972635617",
    appId: "1:670972635617:web:53027f71b76f8c9860caa0",
    measurementId: "G-65JLSKDX97"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const gm = 'Ghulam Mustafa';
export { app, auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setDoc, doc, getDoc, gm };
