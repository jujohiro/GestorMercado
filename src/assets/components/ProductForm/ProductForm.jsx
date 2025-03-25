import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import "./ProductForm.css";

const ProductForm = ({ category }) => {
  const { addProduct } = useProduct();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !brand || !price || !unit || !image) {
      alert("Completa todos los campos.");
      return;
    }

    addProduct({ name, brand, price, unit, category, image });

    setName("");
    setBrand("");
    setPrice("");
    setUnit("");
    setImage("");
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
        <input type="text" placeholder="URL Imagen" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ProductForm;
