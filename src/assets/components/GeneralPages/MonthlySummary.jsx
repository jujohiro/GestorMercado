import { useEffect, useState } from "react";
import { db } from "../../components/Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./MonthlySummary.css";

const MonthlySummary = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));
        const all = snapshot.docs.map(doc => doc.data());

        const grouped = all.reduce((acc, item) => {
          if (!item.fecha || !item.precio) return acc;
          const date = new Date(item.fecha);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          acc[month] = acc[month] || { total: 0, items: [] };
          acc[month].total += item.precio;
          acc[month].items.push(item.nombre);
          return acc;
        }, {});

        const result = Object.entries(grouped).map(([month, data]) => ({
          month,
          total: data.total,
          items: data.items
        }));

        setMonthlyData(result);
      } catch (err) {
        setError("Failed to load monthly summary.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="summary-container">
      <h2>💰 Monthly Purchase Summary</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {monthlyData.length === 0 && !loading && <p>No data available.</p>}

      {monthlyData.map((monthData, idx) => (
        <div key={idx} className="summary-card">
          <h3>{monthData.month}</h3>
          <p><strong>Total:</strong> ${monthData.total.toFixed(2)}</p>
          <ul>
            {monthData.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MonthlySummary;
