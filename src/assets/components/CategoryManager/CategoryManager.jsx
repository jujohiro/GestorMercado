import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryManager.css";

const defaultCategories = [
  { id: 1, name: "Granos", image: "/images/granos.jpg" },
  { id: 2, name: "Lácteos", image: "/images/lacteos.jpg" },
  { id: 3, name: "Dulces", image: "/images/dulces.jpg" },
  { id: 4, name: "Carnes", image: "/images/carnes.jpg" },
  { id: 5, name: "Limpieza", image: "/images/limpieza.jpg" },
  { id: 6, name: "Bebidas", image: "/images/bebidas.jpg" },
  { id: 7, name: "Frutas", image: "/images/frutas.jpg" },
  { id: 8, name: "Verduras", image: "/images/verduras.jpg" },
  { id: 9, name: "Panadería", image: "/images/panaderia.jpg" },
  { id: 10, name: "Enlatados", image: "/images/enlatados.jpg" },
  { id: 11, name: "Hogar", image: "/images/hogar.jpg" },
];

const CategoryManager = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    return storedCategories || defaultCategories;
  });

  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    if (newCategory.trim() === "" || image.trim() === "") return;

    const newCat = { id: categories.length + 1, name: newCategory, image };
    setCategories([...categories, newCat]);
    setNewCategory("");
    setImage("");
  };

  // 👉 Función para redirigir a los productos de la categoría
  const goToCategoryProducts = (categoryName) => {
    navigate(`/productos/${categoryName}`);
  };

  return (
    <div className="category-container">
      {categories.map(category => (
        <div 
          key={category.id} 
          className="category-card"
          onClick={() => goToCategoryProducts(category.name)}
        >
          <img src={category.image} alt={category.name} className="category-image" />
          <h3>{category.name}</h3>
        </div>
      ))}

      <div className="add-category">
        <input 
          type="text" 
          placeholder="Nueva Categoría" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="URL Imagen" 
          value={image} 
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={addCategory}>Agregar Categoría</button>
      </div>
    </div>
  );
};

export default CategoryManager;
