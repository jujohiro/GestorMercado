import { createContext, useState, useContext } from "react";

// Creamos el contexto
const CategoryContext = createContext();

// Hook personalizado para acceder al contexto
export const useCategory = () => useContext(CategoryContext);

// Proveedor del contexto
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Función para agregar una nueva categoría
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // Función para eliminar una categoría
  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
