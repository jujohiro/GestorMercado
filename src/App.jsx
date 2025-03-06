import { useStore } from "./assets/context/StoreContext";
import Navbar from "./assets/components/Navbar/Navbar";
import CategoryManager from "./assets/components/CategoryManager/CategoryManager";
import ProductForm from "./assets/components/ProductForm/ProductForm";
import ProductList from "./assets/components/ProductList/ProductList";
import "./App.css";

function App() {
  const { selectedStore } = useStore();

  return (
    <>
      <Navbar />
    <CategoryManager/>
    <ProductForm />
    <ProductList />
      {selectedStore ? (
        <p> Comprando en: <strong>{selectedStore}</strong></p>
      ) : (
        <p>🛒 Por favor selecciona una tienda.</p>
      )}
    </>
  );
}

export default App;
