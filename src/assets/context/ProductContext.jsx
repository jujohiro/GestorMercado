import { createContext, useState, useContext, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase/FirebaseConfig"; // Importar Firestore

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔹 Cargar productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  // 🔹 Agregar un producto a Firestore
  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      setProducts([...products, { id: docRef.id, ...product }]);
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

