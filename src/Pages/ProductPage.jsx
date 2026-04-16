import { Link, useLocation, useNavigate } from "react-router-dom";

function ProductPage({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-card">
          <h2>Товар не найден</h2>
          <button className="product-button" onClick={() => navigate("/")}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
          <button className="product-button" onClick={addToCart}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;