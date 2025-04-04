import { useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddStore = () => {
  const [storeName, setStoreName] = useState("");

  const handleAddStore = async (e) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    try {
      await addDoc(collection(db, "stores"), { name: storeName });
      alert("Tienda registrada correctamente.");
      setStoreName("");
    } catch (error) {
      console.error("Error al registrar tienda: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddStore}>
        <input
          type="text"
          placeholder="Nombre de la tienda"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <button type="submit">Agregar Tienda</button>
      </form>
    </div>
  );
};

export default AddStore;
