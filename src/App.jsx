import { useStore } from "./assets/context/StoreContext";
import Navbar from "./assets/components/Navbar/Navbar";
import CategoryManager from "./assets/components/CategoryManager/CategoryManager";
import "./App.css";

function App() {
  const { selectedStore } = useStore();

  return (
    <>
      <Navbar />
    <CategoryManager/>
      {selectedStore ? (
        <p> Comprando en: <strong>{selectedStore}</strong></p>
      ) : (
        <p>🛒 Por favor selecciona una tienda.</p>
      )}
    </>
  );
}

export default App;
