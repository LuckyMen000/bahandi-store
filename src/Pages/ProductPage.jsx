import { Link, useLocation } from "react-router-dom";

function ProductPage() {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <div className="product-page">
      <div className="product-card">
        <Link to="/" className="product-back">
          ← Назад
        </Link>

        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{product.price} ₸</p>
          <button className="product-button">Купить</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;