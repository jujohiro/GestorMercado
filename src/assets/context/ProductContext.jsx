import { createContext, useState, useContext } from "react";

// Crear contexto
const ProductContext = createContext();

// Hook personalizado
export const useProduct = () => useContext(ProductContext);

// Proveedor del contexto
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Agregar un producto a la lista
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // Actualizar un producto
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

