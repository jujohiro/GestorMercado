import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import "./ProductForm.css"; //  Estilos

const ProductForm = () => {
  const { addProduct } = useProduct();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !brand || !price || !unit) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    addProduct({ name, brand, price, unit });

    // Limpiar formulario
    setName("");
    setBrand("");
    setPrice("");
    setUnit("");
  };

  return (
    <div className="product-form-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="">Unidad de Medida</option>
          <option value="kg">kg</option>
          <option value="L">L</option>
          <option value="unidad">Unidad</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ProductForm;
