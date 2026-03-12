import '../assets/style.css'

function Footer(){
    return(
        <footer class="footer">
    <div class="footer-container">

        <div class="footer-left">
            <div class="footer-logo">BAHANDI</div>
            <div class="footer-copy">
                © 2024 ТОО Баханди. Все права защищены
            </div>
        </div>

        <div class="footer-right">
            <div class="footer-title">Компания</div>

            <a href="#">Франшиза</a>
            <a href="#">Вакансии</a>
            <a href="#">Оферта</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Карта сайта</a>
        </div>

    </div>
</footer>
    )
}

export default Footer;