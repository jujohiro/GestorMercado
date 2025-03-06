import { useState } from "react";
import { useCategory } from "../../context/CategoryContext";
import "./CategoryManager.css"; // Estilos para mejorar la UI

const CategoryManager = () => {
  const { categories, addCategory, removeCategory } = useCategory();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategory(newCategory.trim());
      setNewCategory(""); // Limpiar input después de agregar
    }
  };

  return (
    <div className="category-manager-container">
      <h2>Administrar Categorías</h2>
      
      <div className="category-input">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Agregar</button>
      </div>

      <ul className="category-list">
        {categories.length === 0 ? (
          <p>No hay categorías creadas.</p>
        ) : (
          categories.map((category, index) => (
            <li key={index}>
              {category}
              <button onClick={() => removeCategory(category)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CategoryManager;
