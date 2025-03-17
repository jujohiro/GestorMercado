import { useState } from "react";
import "./ProductList.css";

const initialProducts = [
  { id: 1, name: "Arroz", brand: "Diana", price: 2500, unit: "kg", image: "/images/arroz-diana.jpg" },
  { id: 2, name: "Frijoles", brand: "La Abuela", price: 3800, unit: "kg", image: "/images/frijol.png" },
  { id: 3, name: "Panela", brand: "Gourmet", price: 2200, unit: "paquete", image: "/images/panela.jpg" },
  { id: 4, name: "Leche", brand: "Alpina", price: 4200, unit: "litro", image: "/images/leche.jpg" },
  { id: 5, name: "Queso", brand: "Colanta", price: 7800, unit: "kg", image: "/images/queso colanta.jpg" },
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          
          {editingProduct?.id === product.id ? (
            <>
              <input type="text" name="name" value={editingProduct.name} onChange={handleChange} className="edit-input" />
              <input type="text" name="brand" value={editingProduct.brand} onChange={handleChange} className="edit-input" />
              <input type="number" name="price" value={editingProduct.price} onChange={handleChange} className="edit-input" />
              <input type="text" name="unit" value={editingProduct.unit} onChange={handleChange} className="edit-input" />
              <button onClick={handleSave} className="save-btn">Guardar</button>
            </>
          ) : (
            <>
              <h3>{product.name}</h3>
              <p><strong>Marca:</strong> {product.brand}</p>
              <p><strong>Precio:</strong> ${product.price} / {product.unit}</p>
              <div className="btn-group">
                <button onClick={() => handleEdit(product)} className="edit-btn">Editar</button>
                <button onClick={() => deleteProduct(product.id)} className="delete-btn">Eliminar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
