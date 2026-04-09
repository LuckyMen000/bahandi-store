import "../assets/style.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="logo">BAHANDI</div>

      <div className="links">
        <Link to="/?category=burgers" className="link">
          Бургеры
        </Link>
        <Link to="/?category=drinks" className="link">
          Напитки
        </Link>
        <Link to="/?category=combo" className="link">
          Комбо
        </Link>
        <a href="/" className="link-button">Корзина</a>
      </div>
    </div>
  );
}

export default Header;