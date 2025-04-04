import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDf0x53A1q7tOcpS2dE0MmYFYUcyzL76nE",
  authDomain: "gestor-de-mercado-b8887.firebaseapp.com",
  projectId: "gestor-de-mercado-b8887",
  storageBucket: "gestor-de-mercado-b8887.appspot.com", 
  messagingSenderId: "461450534633",
  appId: "1:461450534633:web:96f58e633a55a21edb5a78"
};

// 🔹 Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase); // Exportar Firestore

// 🔹 Configurar persistencia de sesión
setPersistence(auth, browserSessionPersistence)
  .then(() => console.log("Persistencia de sesión establecida en Firebase."))
  .catch((error) => console.error("Error al establecer persistencia:", error.message));

// 🔹 Proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider(); // Solo si Facebook está habilitado en Firebase

export default appFirebase;

