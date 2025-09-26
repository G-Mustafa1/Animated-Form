import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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

const gm = 'Ghulam Mustafa'

export {
   app,
   auth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   gm
}