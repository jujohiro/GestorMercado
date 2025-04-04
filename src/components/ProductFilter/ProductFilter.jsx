import { useState } from "react";
import "./ProductFilter.css";

const ProductFilter = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    name: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      category: ""
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="product-filter-container">
      <h3 className="filter-title">Filtrar Productos</h3>
      <div className="filter-fields">
        <input type="text" name="name" placeholder="Nombre" value={localFilters.name} onChange={handleChange} />
        <input type="text" name="brand" placeholder="Marca" value={localFilters.brand} onChange={handleChange} />
        <input type="text" name="category" placeholder="Categoría" value={localFilters.category} onChange={handleChange} />
        <input type="number" name="minPrice" placeholder="Precio mínimo" value={localFilters.minPrice} onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Precio máximo" value={localFilters.maxPrice} onChange={handleChange} />
      </div>
      <button onClick={handleClearFilters}>Limpiar filtros</button>
    </div>
  );
};

export default ProductFilter;
