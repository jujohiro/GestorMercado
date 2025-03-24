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
  signOut
} from "firebase/auth";
import appFirebase from "../components/Firebase/FirebaseConfig";
import { auth } from "../components/Firebase/FirebaseConfig";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
    
  const registerWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
    
  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const loginWithGithub = () => signInWithPopup(auth, new GithubAuthProvider());
  const loginWithFacebook = () => signInWithPopup(auth, new FacebookAuthProvider());
  
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, registerWithEmail, loginWithGoogle, loginWithGithub, loginWithFacebook, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

