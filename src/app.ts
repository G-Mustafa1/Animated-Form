import { app, auth, db, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc } from './firebase'

const contanir = document.querySelector('.contanir') as HTMLDivElement;
const singupBtn = document.querySelector('.singup-btn') as HTMLButtonElement;
const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
const passwordShow = document.querySelectorAll('.password') as NodeListOf<HTMLInputElement>;
const showButtons = document.querySelectorAll('#show') as NodeListOf<HTMLElement>;
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const sig_name = document.getElementById('name') as HTMLInputElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loader = document.getElementById('loader') as HTMLDivElement;
const contanir_box = document.getElementById('contanir') as HTMLDivElement;
const googleBtn = document.getElementById('google') as HTMLButtonElement;

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
      if (inu.type === 'password') {
        inu.type = 'text';
        hy.classList.remove('fa-eye');
        hy.classList.add('fa-eye-slash');
      } else {
        inu.type = 'password';
        hy.classList.add('fa-eye');
        hy.classList.remove('fa-eye-slash')
      }
    })
  })
})


signupForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement;
  const formBtn = form.elements[3] as HTMLButtonElement;

  const name = sig_name.value;
  const email = (document.getElementById('email_sig') as HTMLInputElement).value;
  const password = (document.getElementById('password_sig') as HTMLInputElement).value;

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
  } catch (error: any) {
    const errorMessage = error.message;
    Swal.fire({
      title: "error",
      text: errorMessage,
      icon: "error"
    });
  } finally {
    formBtn.disabled = false;
    formBtn.innerText = 'Sign Up';
    formBtn.style.cursor = 'pointer';
    formBtn.style.backgroundColor = '#7494ec';
  }
});

loginForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement;
  const formBtn = form.elements[2] as HTMLButtonElement;

  const email = (document.getElementById('email_log') as HTMLInputElement).value;
  const password = (document.getElementById('password_log') as HTMLInputElement).value;

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
  } catch (error: any) {
    const errorMessage = error.message;
    Swal.fire({
      title: "error",
      text: errorMessage,
      icon: "error"
    });
  } finally {
    formBtn.disabled = false;
    formBtn.innerText = 'Log In';
    formBtn.style.cursor = 'pointer';
    formBtn.style.backgroundColor = '#7494ec';
  }
  loginForm.reset()
})


googleBtn.addEventListener('click', async () => {
  googleBtn.style.cursor = 'not-allowed';

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "name", user.uid), {
      name: user.displayName,
      email: user.email
    }, { merge: true } );

    Swal.fire({
      title: "success",
      text: "Logged in successfully!",
      icon: "success"
    })    

    window.location.href = "../dashbord/index.html";

  } catch (error: any) {
    swal.fire({
      title: "error",
      text: error.message,
      icon: "error"
    });
  } finally {
    googleBtn.style.cursor = 'pointer';
  }
});

function formloader() {
  setTimeout(() => {
    loader.style.display = 'none';
    contanir_box.style.display = 'block';
  }, 1000)
}

window.addEventListener('load', formloader)

