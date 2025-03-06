import { useProduct } from "../../context/ProductContext";
import "./ProductList.css"; // Estilos

const ProductList = () => {
  const { products } = useProduct();

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <strong>{product.name}</strong> - {product.brand} - ${product.price} ({product.unit})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
