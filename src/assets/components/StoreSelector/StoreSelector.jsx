import { useStore } from "../../context/StoreContext";
import "./StoreSelector.css"; 

const StoreSelector = () => {
  const { selectedStore, setSelectedStore } = useStore();

  const tiendas = ["Tiendas D1", "Súper Inter", "Ara", "Éxito", "Agromercado La Montaña", "Otro"];

  return (
    <div className="store-selector-container">
      <label htmlFor="store-select" className="store-selector-label">Seleccionar tienda:</label>
      <select
        id="store-select"
        value={selectedStore || ""}
        onChange={(e) => setSelectedStore(e.target.value)}
        className="store-selector-dropdown"
      >
        <option value="" disabled>Seleccione una tienda</option>
        {tiendas.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>
      {selectedStore && <p className="selected-store">🏬 Tienda seleccionada: <strong>{selectedStore}</strong></p>}
    </div>
  );
};

export default StoreSelector;
