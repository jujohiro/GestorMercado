import { useState } from "react";
import emailjs from "emailjs-com";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_gestor";
    const templateID = "template_6gggw3q";
    const publicKey = "w79BlHFBkzn5y_oMIPtmb";

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
        setErrorMessage("");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        setErrorMessage("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
        setSuccessMessage("");
      });
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