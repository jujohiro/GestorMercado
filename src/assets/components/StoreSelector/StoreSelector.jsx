import { useStore } from "../../../assets/context/StoreContext";
import "./StoreSelector.css"; // ✅ Importamos el nuevo CSS

const StoreSelector = () => {
  const { selectedStore, setSelectedStore } = useStore();

  const tiendas = ["Tiendas D1", "Tienda Súper Inter", "Ara", "Éxito", "Agromercado la Montaña", "Otro"];

  return (
    <div className="store-selector-container">
      <label htmlFor="store-select" className="store-selector-label">
        Seleccionar tienda:
      </label>
      <select
        id="store-select"
        className="store-selector-dropdown"
        value={selectedStore || ""}
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        <option value="" disabled>Seleccione una tienda</option>
        {tiendas.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>
      {selectedStore && (
        <p className="selected-store">
          Tienda seleccionada: <strong>{selectedStore}</strong>
        </p>
      )}
    </div>
  );
};

export default StoreSelector;
