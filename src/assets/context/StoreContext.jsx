import { createContext, useState, useEffect, useContext } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(
    localStorage.getItem("selectedStore") || null
  );

  useEffect(() => {
    localStorage.setItem("selectedStore", selectedStore);
  }, [selectedStore]);

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore }}>
      {children}
    </StoreContext.Provider>
  );
};

