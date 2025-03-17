import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { user, loginWithGoogle, loginWithGithub, loginWithFacebook, loginWithEmail, registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    if (email && password) {
      try {
        await loginWithEmail(email, password);
        navigate("/"); 
      } catch (error) {
        alert("Error: " + error.message);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };
  
  const handleRegister = async () => {
    if (email && password) {
      try {
        await registerWithEmail(email, password);
        navigate("/"); 
      } catch (error) {
        alert("Error: " + error.message);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{user ? "Bienvenido" : "Iniciar Sesión"}</h2>

        {user ? (
          <div className="profile-container">
            <img src={user.photoURL || "/default-avatar.png"} alt="Perfil" className="profile-img" />
            <p>{user.displayName || user.email}</p>
          </div>
        ) : (
          <>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="auth-input"
            />

            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="auth-input"
            />

            <button onClick={handleEmailLogin} className="email-btn">Iniciar con Email</button>
            <button onClick={handleRegister} className="register-btn">Registrarse</button>
            <button onClick={() => loginWithGoogle().then(() => navigate("/"))} className="google-btn">Iniciar con Google</button>
            <button onClick={() => loginWithGithub().then(() => navigate("/"))} className="github-btn">Iniciar con GitHub</button>
            <button onClick={() => loginWithFacebook().then(() => navigate("/"))} className="facebook-btn">Iniciar con Facebook</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

