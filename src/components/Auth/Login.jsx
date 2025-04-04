import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { user, loginWithGoogle, loginWithGithub, loginWithFacebook, loginWithEmail, registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    if (email && password) {
      try {
        await loginWithEmail(email, password);
        setMessage("Inicio de sesión exitoso. Redirigiendo...");
        setTimeout(() => navigate("/"), 2000); // 🔄 Redirigir después de 2 segundos
      } catch (error) {
        setError("Error al iniciar sesión: " + error.message);
      }
    } else {
      setError("Por favor, completa todos los campos.");
    }
  };
  
  const handleRegister = async () => {
    if (email && password) {
      try {
        await registerWithEmail(email, password);
        setMessage("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate("/"), 2000); // 🔄 Redirigir después de 2 segundos
      } catch (error) {
        setError("Error al registrarse: " + error.message);
      }
    } else {
      setError("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{user ? "Bienvenido" : "Iniciar Sesión"}</h2>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        {!user && (
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

            <p>
              <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
