import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductFilter from "../ProductFilter/ProductFilter";
import "./ProductList.css";

const ProductList = () => {
  const { products } = useProduct();
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
    const brandMatch = product.brand.toLowerCase().includes(filters.brand.toLowerCase());
    const categoryMatch = product.category.toLowerCase().includes(filters.category.toLowerCase());
    const minPriceMatch = filters.minPrice === "" || product.price >= parseFloat(filters.minPrice);
    const maxPriceMatch = filters.maxPrice === "" || product.price <= parseFloat(filters.maxPrice);

    return nameMatch && brandMatch && categoryMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <div>
      <ProductFilter onFilterChange={handleFilterChange} />
      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Marca: {product.brand}</p>
              <p>Precio: ${product.price}</p>
              <p>Categoría: {product.category}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos que coincidan con los filtros aplicados.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
