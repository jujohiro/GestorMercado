import { createContext, useState, useEffect, useContext } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { auth } from "../components/Firebase/FirebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const setupPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence); // Guarda la sesión en el navegador
      } catch (error) {
        console.error("Error configurando la persistencia:", error.message);
      }
    };

    setupPersistence();
  }, []);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const loginWithGithub = () => signInWithPopup(auth, new GithubAuthProvider());
  const loginWithFacebook = () => signInWithPopup(auth, new FacebookAuthProvider());

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{
       user,
        loginWithEmail,
         registerWithEmail,
          loginWithGoogle,
          loginWithGithub,
           loginWithFacebook,
            logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
