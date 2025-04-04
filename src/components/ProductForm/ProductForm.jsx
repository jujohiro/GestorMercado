import { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import StoreSelector from "../StoreSelector/StoreSelector";
import "./ProductForm.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const categoryList = snapshot.docs.map(doc => doc.data().name);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !brand || !price || !unit || !quantity || !store || !category || !date) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        brand,
        price: parseFloat(price),
        unit,
        quantity: parseFloat(quantity),
        image: image || "https://via.placeholder.com/150",
        store,
        category,
        fecha: Timestamp.fromDate(new Date(date)),
        status: "active"
      });
      alert("Producto agregado correctamente.");
      setName(""); setBrand(""); setPrice(""); setUnit("");
      setQuantity(""); setImage(""); setStore(""); setCategory(""); setDate("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleNewCategorySubmit = async () => {
    if (!newCategory.trim()) return;
    try {
      await addDoc(collection(db, "categories"), { name: newCategory });
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setShowModal(false);
      alert("Categoría agregada correctamente.");
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />

        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="">Unidad de Medida</option>
          <option value="kg">Kilogramo (kg)</option>
          <option value="g">Gramos (g)</option>
          <option value="L">Litro (L)</option>
          <option value="ml">Mililitro (ml)</option>
          <option value="unidad">Unidad</option>
        </select>

        <input type="number" placeholder="Cantidad" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="text" placeholder="URL Imagen (opcional)" value={image} onChange={(e) => setImage(e.target.value)} />

        <StoreSelector selectedStore={store} setSelectedStore={setStore} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Seleccionar Categoría</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
          <option value="new">➕ Crear Nueva Categoría</option>
        </select>

        {category === "new" && (
          <>
            <button type="button" onClick={() => setShowModal(true)}>Agregar Nueva Categoría</button>
          </>
        )}

        <input type="date" className="date-input" value={date} onChange={(e) => setDate(e.target.value)} />

        <button type="submit">Agregar Producto</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nueva Categoría</h3>
            <input type="text" placeholder="Nombre de Categoría" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            <button onClick={handleNewCategorySubmit}>Guardar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
