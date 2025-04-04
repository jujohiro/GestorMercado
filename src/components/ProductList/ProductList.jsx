import { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import "./ProductList.css";

const ProductList = ({ searchTerm = "" }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("status", "==", "active"));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const filtered = allProducts.filter(product => {
        const productName = product.name ? product.name.toLowerCase() : "";
        return productName.includes(searchTerm.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [allProducts, searchTerm]);

  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { status: "inactive" });
      setAllProducts(allProducts.filter(product => product.id !== id));
      alert("Producto desactivado correctamente.");
    } catch (error) {
      console.error("Error al desactivar producto:", error);
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Lista de Productos</h2>
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img 
                src={product.image || "https://via.placeholder.com/150"} 
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name || "Producto sin nombre"}</h3>
                <p>Marca: {product.brand || "Desconocida"}</p>
                <p>Precio: ${product.price || "No registrado"}</p>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
