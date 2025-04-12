import { useState, useEffect } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import './Filterproducts.css';

const FilterProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "products"), where("status", "==", "active"));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const applyFilters = () => {
    let filtered = allProducts;

    if (filters.name) {
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(); // Aplica los filtros cada vez que cambian
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
        price: parseFloat(editedData.price),
      });

      setMessage("Producto actualizado con éxito.");
      setEditingProduct(null);

      // Actualizar productos sin tener que recargar la página
      const updatedProducts = allProducts.map(product =>
        product.id === editedData.id ? { ...product, ...editedData } : product
      );
      setAllProducts(updatedProducts);
      applyFilters(); // Aplicar filtros nuevamente con la lista actualizada
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
