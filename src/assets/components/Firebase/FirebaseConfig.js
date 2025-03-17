import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserSessionPersistence 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf0x53A1q7tOcpS2dE0MmYFYUcyzL76nE",
  authDomain: "gestor-de-mercado-b8887.firebaseapp.com",
  projectId: "gestor-de-mercado-b8887",
  storageBucket: "gestor-de-mercado-b8887.appspot.com", 
  messagingSenderId: "461450534633",
  appId: "1:461450534633:web:96f58e633a55a21edb5a78"
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistencia de sesión establecida en Firebase.");
  })
  .catch((error) => {
    console.error("Error al establecer persistencia:", error.message);
  });

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { 
  auth, 
  googleProvider, 
  githubProvider, 
  facebookProvider, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
};
export default appFirebase;