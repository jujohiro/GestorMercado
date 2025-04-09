import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import "./Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "support_messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date()
      });
      
      setSuccessMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
      setErrorMessage("");
      setFormData({ name: "", email: "", message: "" });
      console.log("Mensaje enviado con ID:", docRef.id);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setErrorMessage("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="support-container">
      <h2>Contacto y Soporte</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form className="support-form" onSubmit={handleSubmit}>
        <input 
          type="text"
          name="name"
          placeholder="Tu Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Tu Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea 
          name="message"
          placeholder="Escribe tu mensaje..."
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Support;
