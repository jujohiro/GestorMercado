import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductForm from "../ProductForm/ProductForm";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { products, addProduct, updateProductStatus, removeProduct } = useProduct();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({});

  const filteredProducts = products.filter(
    (product) => product.category === categoryName && product.status !== "inactive"
  );

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedData(product);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProductStatus(editingProduct, editedData);
    setEditingProduct(null);
  };

  return (
    <div className="category-products-container">
      <h2>Productos en {categoryName}</h2>

      <ProductForm onAddProduct={addProduct} category={categoryName} />

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />

              {editingProduct === product.id ? (
                <>
                  <input name="name" value={editedData.name} onChange={handleChange} />
                  <input name="brand" value={editedData.brand} onChange={handleChange} />
                  <input name="price" type="number" value={editedData.price} onChange={handleChange} />
                  <input name="unit" value={editedData.unit} onChange={handleChange} />
                  <button className="save-btn" onClick={handleSave}>Guardar</button>
                </>
              ) : (
                <>
                  <h3>{product.name}</h3>
                  <p><strong>Marca:</strong> {product.brand}</p>
                  <p><strong>Precio:</strong> ${product.price} / {product.unit}</p>
                  <div className="btn-group">
                  <button onClick={() => handleEdit(product)}>Editar</button>
                 <button onClick={() => removeProduct(product.id)}>Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

