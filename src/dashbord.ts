import { auth, signOut, getDoc, doc, db, onAuthStateChanged } from "./firebase";

const nav_nam = document.getElementById('nav-nam') as HTMLElement;
const sing_out = document.getElementById('sing-out') as HTMLFormElement;
const hide = document.getElementById('hide') as HTMLDivElement;
const loader = document.getElementById('loader') as HTMLDivElement;

onAuthStateChanged(auth, async (user : any) => {
   if (user) {
      const userDoc = await getDoc(doc(db, "name", user.uid));
      if (userDoc.exists()) {
         const userData = userDoc.data();
         nav_nam.textContent = `Hello ${userData.name} !`;
      } else {
         nav_nam.textContent = `Hello ${user.email} !`;
      }
   } else {
      window.location.href = '../index.html';
   }
})

sing_out.addEventListener('submit', (e: Event) => {
   e.preventDefault()
   signOut(auth).then(() => {
      // Sign-out successful.
      Swal.fire({
         title: "success",
         text: "Sign out successfully!",
         icon: "success"
      });
      console.log('Sign-out successful');
      window.location.href = '../index.html';
   }).catch((error: Error) => {
      // An error happened.
      const errorMessage = error.message;
      Swal.fire({
         title: "error",
         text: errorMessage,
         icon: "error"
      });
   });
})

function loadform() {
   setTimeout(() => {
      loader.style.display = 'none';
      hide.style.display = 'block';
   }, 1000)
}

window.addEventListener('load', loadform)

