import "../assets/style.css";
import { Link } from "react-router-dom";

function Header({ isAuth, cart }) {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="header">
      <div className="logo">BAHANDI</div>

      <div className="links">
        <Link to="/" className="link">Все продукты</Link>
        <Link to="/?category=burgers" className="link">Бургеры</Link>
        <Link to="/?category=drinks" className="link">Напитки</Link>
        <Link to="/?category=combo" className="link">Комбо</Link>

        <Link to="/cart" className="cart-button">
          Корзина
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </Link>

        {isAuth ? (
          <Link to="/profile" className="link-button">
            Профиль
          </Link>
        ) : (
          <Link to="/login" className="link-button">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;