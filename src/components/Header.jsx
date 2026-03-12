import '../assets/style.css'

function Header(){
    return(
        <div className="header">
            <div className="logo">BAHANDI</div>
            <div className="links">
                <a href="#" className="link">Бургеры</a>
                <a href="#" className="link">Напитки</a>
                <a href="#"  className="link">Комбо</a>
                <a href="#" className="link-button">Корзина</a>
            </div>
        </div>
    )
}

export default Header;