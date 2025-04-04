import { useState, useEffect } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { db } from "../../components/Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
 // si lo querés estilizar igual que ProductList

const FilterProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(products);
        setFilteredProducts(products); // mostrar todos al inicio
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = allProducts.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const price = parseFloat(product.price);

      const matchesName = !filters.name || name.includes(filters.name.toLowerCase());
      const matchesBrand = !filters.brand || brand.includes(filters.brand.toLowerCase());
      const matchesCategory = !filters.category || category.includes(filters.category.toLowerCase());
      const matchesMin = !filters.minPrice || price >= parseFloat(filters.minPrice);
      const matchesMax = !filters.maxPrice || price <= parseFloat(filters.maxPrice);

      return matchesName && matchesBrand && matchesCategory && matchesMin && matchesMax;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="page-container">
      <h2>🔍 Filtro de Productos</h2>
      <ProductFilter onFilterChange={handleFilterChange} />

      <div className="resultados-productos">
        <h3>Resultados: {filteredProducts.length}</h3>
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos con estos filtros.</p>
        ) : (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p><strong>Marca:</strong> {product.brand}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterProducts;
