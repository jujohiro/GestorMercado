import { useState, useEffect } from "react";
import { db } from "./Firebase/FirebaseConfig";  
import { collection, getDocs, query, where } from "firebase/firestore";
import "./PriceComparison.css";

const PriceComparison = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const uniqueProducts = [...new Set(productsData.map(product => product.name))];
        setProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("No se pudieron cargar los productos.");
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = async (e) => {
    const productName = e.target.value;
    setSelectedProduct(productName);
    setLoading(true);
    setComparisonData([]);
    setError(null);

    if (!productName) return;

    try {
      const q = query(
        collection(db, "products"),
        where("name", "==", productName)
      );
      const snapshot = await getDocs(q);

      const priceHistory = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          price: data.price,
          date: data.fecha?.toDate().toLocaleDateString() || "Fecha no disponible",
        };
      });

      setComparisonData(priceHistory.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching price history:", error);
      setError("No se pudo cargar la comparación de precios.");
      setLoading(false);
    }
  };

  return (
    <div className="price-comparison-container">
      <h2>Comparar Precios por Producto</h2>

      {error && <p className="error-message">{error}</p>}

      <select onChange={handleProductChange} value={selectedProduct}>
        <option value="">Seleccionar Producto</option>
        {products.map((productName, index) => (
          <option key={index} value={productName}>
            {productName}
          </option>
        ))}
      </select>

      {loading && <p>Cargando...</p>}

      {comparisonData.length > 0 && (
        <table className="price-comparison-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>${entry.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PriceComparison;
