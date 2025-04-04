import { useState, useEffect } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import './FilterProducts.css';

const FilterProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [message, setMessage] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  const applyFilters = async () => {
    setLoading(true);
    try {
      let q = collection(db, "products");

      const conditions = [];
      
      if (filters.name) {
        conditions.push(where("name", ">=", filters.name));
        conditions.push(where("name", "<=", filters.name + "\uf8ff"));
      }
      if (filters.brand) {
        conditions.push(where("brand", "==", filters.brand));
      }
      if (filters.category) {
        conditions.push(where("category", "==", filters.category));
      }

      if (conditions.length > 0) {
        q = query(q, ...conditions);
      }

      const snapshot = await getDocs(q);
      let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (filters.minPrice) {
        products = products.filter(product => product.price >= parseFloat(filters.minPrice));
      }

      if (filters.maxPrice) {
        products = products.filter(product => product.price <= parseFloat(filters.maxPrice));
      }

      setFilteredProducts(products);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
    setLoading(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters();
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedData(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async () => {
    if (!editedData.id) return;

    try {
      const productRef = doc(db, "products", editedData.id);
      await updateDoc(productRef, {
        name: editedData.name,
        brand: editedData.brand,
        category: editedData.category,
        price: parseFloat(editedData.price)
      });

      setMessage("Producto actualizado con éxito.");
      setEditingProduct(null);
      applyFilters(); // Recargar los productos actualizados
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setMessage("Error al actualizar el producto.");
    }
  };

  return (
    <div className="page-container">
      
      <ProductFilter onFilterChange={handleFilterChange} />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="resultados-productos">
          <h3>Resultados: {filteredProducts.length}</h3>
          {message && <p className="loading-message">{message}</p>}
          {filteredProducts.length === 0 ? (
            <p>No se encontraron productos con estos filtros.</p>
          ) : (
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  {editingProduct === product.id ? (
                    <>
                      <input 
                        name="name" 
                        value={editedData.name} 
                        onChange={handleChange} 
                        placeholder="Nombre" 
                      />
                      <input 
                        name="brand" 
                        value={editedData.brand} 
                        onChange={handleChange} 
                        placeholder="Marca" 
                      />
                      <input 
                        name="category" 
                        value={editedData.category} 
                        onChange={handleChange} 
                        placeholder="Categoría" 
                      />
                      <input 
                        name="price" 
                        value={editedData.price} 
                        onChange={handleChange} 
                        placeholder="Precio" 
                        type="number" 
                      />
                      <button onClick={handleSave}>Guardar</button>
                    </>
                  ) : (
                    <>
                      <h4>{product.name}</h4>
                      <p><strong>Marca:</strong> {product.brand}</p>
                      <p><strong>Categoría:</strong> {product.category}</p>
                      <p><strong>Precio:</strong> ${product.price}</p>
                      <button onClick={() => handleEdit(product)}>Editar</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
