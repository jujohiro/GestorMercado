import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css"; 

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Error al registrarse. Verifica los datos.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Ingresar Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Ingresar Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
