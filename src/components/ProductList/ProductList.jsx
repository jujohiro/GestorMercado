import { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import "./ProductList.css";

const ProductList = ({ searchTerm = "" }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    brand: "",
    price: "",
    image: "",
  });

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
      alert("Producto eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name || "",
      brand: product.brand || "",
      price: product.price || "",
      image: product.image || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEdit = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { ...editForm });
      setAllProducts(allProducts.map(product => 
        product.id === id ? { ...product, ...editForm } : product
      ));
      setEditingProduct(null);
      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Lista de Productos</h2>
      {filteredProducts.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              editingProduct === product.id ? (
                <tr key={product.id} className="editing-row">
                  <td>
                    <input name="image" value={editForm.image} onChange={handleEditChange} placeholder="URL de Imagen" />
                  </td>
                  <td>
                    <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Nombre del Producto" />
                  </td>
                  <td>
                    <input name="brand" value={editForm.brand} onChange={handleEditChange} placeholder="Marca" />
                  </td>
                  <td>
                    <input name="price" value={editForm.price} onChange={handleEditChange} placeholder="Precio" />
                  </td>
                  <td>
                    <button className="product-button save-btn" onClick={() => saveEdit(product.id)}>Guardar</button>
                    <button className="product-button cancel-btn" onClick={() => setEditingProduct(null)}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={product.id}>
                  <td><img src={product.image || "https://via.placeholder.com/150"} alt={product.name} /></td>
                  <td>{product.name || "Producto sin nombre"}</td>
                  <td>{product.brand || "Desconocida"}</td>
                  <td>${product.price || "No registrado"}</td>
                  <td>
                    <button className="product-button edit-btn" onClick={() => startEditing(product)}>Editar</button>
                    <button className="product-button delete-btn" onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
