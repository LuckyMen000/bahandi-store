import '../assets/style.css'

function Header(){
    return(
        <div className="header">
            <div className="logo">BAHANDI</div>
            <div className="links">
                <a className="link">Бургеры</a>
                <a className="link">Напитки</a>
                <a className="link">Комбо</a>
                <a className="link-button">Корзина</a>
            </div>
        </div>
    )
}

export default Header