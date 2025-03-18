import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductForm from "../ProductForm/ProductForm";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts.filter((p) => p.category === categoryName));
  }, [categoryName]);

  const addProduct = (product) => {
    const newProduct = { id: Date.now(), category: categoryName, ...product };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedProducts = products.map((p) => 
      p.id === editingProduct.id ? editingProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="category-products-container">
      <h2>Productos en {categoryName}</h2>
      <ProductForm onAddProduct={addProduct} />
      
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
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
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

