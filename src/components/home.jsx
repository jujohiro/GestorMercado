import CategoryManager from "./CategoryManager/CategoryManager";  // Ruta correcta
import ProductList from "./ProductList/ProductList";
import ProductForm from "../components/ProductForm/ProductForm";



const HomeComponent = ({ correoUsuario }) => {
  return (
    <div className="home-container">
        <h2 className="welcome-title">Bienvenido, {correoUsuario}</h2>
      
      {/*Mostrar gestión de productos aquí */}
      <CategoryManager />
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default HomeComponent;
