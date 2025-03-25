import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../components/Firebase/FirebaseConfig";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        status: "active", // Estado inicial del producto
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // en ProductContext.jsx

const removeProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { status: "inactive" });
    console.log(`Producto ${id} marcado como inactivo`);
  } catch (error) {
    console.error("Error al eliminar producto (marcar como inactivo):", error);
  }
};

  const updateProductStatus = async (id, newStatus) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating product status: ", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProductStatus, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
