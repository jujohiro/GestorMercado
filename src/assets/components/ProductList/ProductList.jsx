import { useState, useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import "./ProductList.css";

const ProductList = ({ category }) => {
  const { products, updateProduct, removeProduct } = useProduct();
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtrar productos por categoría
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="product-container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.image.startsWith("http") ? product.image : "/images/default.png"}
              alt={product.name}
              className="product-image"
              onError={(e) => e.target.src = "/images/default.png"}
            />
            
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
                <p><strong>Categoría:</strong> {product.category}</p>
                <div className="btn-group">
                  <button onClick={() => handleEdit(product)} className="edit-btn">Editar</button>
                  <button onClick={() => removeProduct(product.id)} className="delete-btn">Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ProductList;

