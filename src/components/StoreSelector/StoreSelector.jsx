import { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig"; //  Asegúrate que esta ruta sea correcta
import { collection, getDocs } from "firebase/firestore";

const StoreSelector = ({ selectedStore, setSelectedStore }) => {
  const [stores, setStores] = useState([]); // Cambié el nombre del estado a 'stores' (en minúscula)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Stores")); // 'Stores' debe coincidir exactamente con el nombre de tu colección en Firebase
        const storesList = querySnapshot.docs.map(doc => doc.data().name);
        setStores(storesList); 
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
      <option value="">Seleccionar tienda</option>
      {stores.map((store, index) => (
        <option key={index} value={store}>{store}</option>
      ))}
    </select>
  );
};

export default StoreSelector;
