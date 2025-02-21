const contanir = document.querySelector('.contanir') as HTMLDivElement;
const singupBtn = document.querySelector('.singup-btn') as HTMLButtonElement;
const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
const passwordShow = document.querySelectorAll('.password') as NodeListOf<HTMLInputElement>;
const showButtons = document.querySelectorAll('#show') as NodeListOf<HTMLElement>;
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const sig_name = document.getElementById('name') as HTMLInputElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;

singupBtn.addEventListener('click', () => {
   contanir.classList.add('active');
})
loginBtn.addEventListener('click', () => {
   contanir.classList.remove('active');
})

showButtons.forEach((hy) => {
   // console.log(hy,'ho' ,index)
   hy.addEventListener('click', () => {
      passwordShow.forEach((inu) => {
         // console.log(inu.value,'hy')
         if(inu.type === 'password'){
            inu.type = 'text';
            hy.classList.remove('fa-eye');
            hy.classList.add('fa-eye-slash');
         }else{
            inu.type = 'password';
            hy.classList.add('fa-eye');
            hy.classList.remove('fa-eye-slash')
         }
      })
   })
   // shoW.addEventListener('click',(hy) => {
   //    console.log(hy,'hy');
   // })
})


// import {app,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "./firebase";
// console.log(createUserWithEmailAndPassword)
// console.log(auth)

import { app , gm , auth , createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged} from './firebase.js'

signupForm.addEventListener('submit',(e: Event) => {
   e.preventDefault()

   const email = (document.getElementById('email_sig') as HTMLInputElement).value;
   const password = (document.getElementById('password_sig') as HTMLInputElement).value;

   createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential : any) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    Swal.fire({
      title: "success",
      text: "Signed up successfully!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    })
  })
  .catch((error : Error) => {
   //  const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    Swal.fire({
      title: "error",
      text: errorMessage,
      icon: "error"
    });
    // ..
  });

})

loginForm.addEventListener('submit', (e: Event) => {
   e.preventDefault()

   const email = (document.getElementById('email_log') as HTMLInputElement).value;
   const password = (document.getElementById('password_log') as HTMLInputElement).value;

   signInWithEmailAndPassword(auth, email, password)
   .then((userCredential : any) => {
     // Signed in 
     const user = userCredential.user;
     // ...
     Swal.fire({
       title: "success",
       text: "Loged in successfully!",
       icon: "success"
     });
     console.log(user)
   //   window.location.href = "./dashbord.html"
   window.location.href = "../dashbord/index.html";
   })
   .catch((error : Error) => {
    //  const errorCode = error.code;
     const errorMessage = error.message;
     Swal.fire({
       title: "error",
       text: errorMessage,
       icon: "error"
     });
   });

   loginForm.reset()
})

onAuthStateChanged(auth, (user : any) => {
   if (user) {
     const uid = user.uid;
     console.log(uid,'user loged in')
   } else {
     // User is signed out
    //  window.location.href = '../index.html'
   }
 });


export{
   sig_name
}