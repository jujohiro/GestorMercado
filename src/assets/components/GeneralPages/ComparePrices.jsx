import { useEffect, useState } from "react";
import { db } from "../../components/Firebase/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import "./ComparePrices.css";

const ComparePrices = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Cargar lista de productos (para el select)
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "productos"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    };
    fetchProducts();
  }, []);

  // 2. Buscar historial de precios por producto
  useEffect(() => {
    const fetchPrices = async () => {
      if (!selectedProduct) return;

      setLoading(true);
      setError("");
      setPriceData([]);

      try {
        const q = query(collection(db, "productos"), where("nombre", "==", selectedProduct));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());

        if (data.length === 0) {
          setError("No hay precios registrados para este producto.");
          return;
        }

        // Agrupar por mes y calcular promedio
        const grouped = {};

        data.forEach((item) => {
          if (!item.fecha || !item.precio) return;
          const date = new Date(item.fecha);
          const mes = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          if (!grouped[mes]) grouped[mes] = [];
          grouped[mes].push(item.precio);
        });

        const result = Object.entries(grouped).map(([mes, precios]) => ({
          mes,
          promedio: +(precios.reduce((a, b) => a + b, 0) / precios.length).toFixed(2)
        }));

        // Ordenar por mes
        result.sort((a, b) => new Date(a.mes) - new Date(b.mes));

        setPriceData(result);
      } catch (err) {
        console.error(err);
        setError("Error al obtener los precios.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [selectedProduct]);

  return (
    <div className="compare-container">
      <h2>📈 Comparar precios por mes</h2>

      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">Selecciona un producto</option>
        {products.map(p => (
          <option key={p.id} value={p.nombre}>{p.nombre}</option>
        ))}
      </select>

      {loading && <p>Cargando gráfico...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && priceData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="promedio" stroke="#00bcd4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ComparePrices;
