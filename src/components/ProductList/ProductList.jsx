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
        //Solo traemos productos activos desde Firebase
        const q = query(collection(db, "products"), where("status", "==", "active"));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // 🔥 Incluimos el ID del producto
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
        const filterTerm = searchTerm.toLowerCase();
        return productName.includes(filterTerm);
      });
      setFilteredProducts(filtered);
    }
  }, [allProducts, searchTerm]);

  // Función para desactivar un producto
  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { status: "inactive" }); // Cambiamos a inactivo en lugar de eliminar
      setAllProducts(allProducts.filter(product => product.id !== id)); // Actualizamos la lista sin recargar
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
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              <img 
                src={product.image || "https://via.placeholder.com/150"} // 🔥 Imagen por defecto si no se encuentra
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="product-text">
                {product.name || "Producto sin nombre"} - {product.brand || "Marca desconocida"}
              </div>
              <div className="product-price">
                ${product.price || "Precio no registrado"}
              </div>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
 
};

export default ProductList;
