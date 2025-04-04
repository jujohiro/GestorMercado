import { useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";  
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      setTimeout(() => navigate("/login"), 4000); // 🔄 Redirige al login después de 4 segundos
    } catch (err) {
      setError("No se pudo enviar el correo. Asegúrate de que el correo está registrado.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Recuperar Contraseña</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleReset}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Enviar Correo de Recuperación</button>
      </form>
      <button onClick={() => navigate("/login")} className="back-button">Volver al Login</button>
    </div>
  );
};

export default ResetPassword;
