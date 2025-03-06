import { createContext, useState, useContext } from "react";

// Creamos el contexto
const StoreContext = createContext();

// Hook personalizado para acceder al contexto
export const useStore = () => useContext(StoreContext);

// Proveedor del contexto
export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore }}>
      {children}
    </StoreContext.Provider>
  );
};
