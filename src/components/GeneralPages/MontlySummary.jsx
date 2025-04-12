import { useState, useEffect } from "react";
import { db } from "../../components/Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./MonthlySummary.css"; // 🔁 Asegúrate de que el nombre esté bien escrito

const MonthlySummary = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const monthlySummary = {};

        products.forEach(product => {
          const date = product.fecha?.toDate();
          if (!date) return;

          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

          if (!monthlySummary[monthYear]) {
            monthlySummary[monthYear] = {
              total: 0,
              products: []
            };
          }

          monthlySummary[monthYear].total += product.price || 0;
          monthlySummary[monthYear].products.push(product);
        });

        setMonthlyData(Object.entries(monthlySummary));
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setError("No se pudo cargar el resumen mensual.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  return (
    <div className="monthly-summary-container">
      <h2>Resumen Mensual de Gastos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      {monthlyData.length > 0 ? (
        <div>
          {monthlyData.map(([monthYear, data]) => (
            <div key={monthYear} className="monthly-summary-card">
              <h3>{monthYear}</h3>
              <p>Total Gastado: ${data.total.toFixed(2)}</p>
              <ul>
                {data.products.map(product => (
                  <li key={product.id} style={{ color: "#000" }}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default MonthlySummary;
