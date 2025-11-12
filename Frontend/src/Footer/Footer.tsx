import './Footer.css'
import VkIcon from '../photo/VK Logo.svg'
import TelegramIcon from '../photo/telegram-svgrepo-com.svg'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-section">
                        <h3>О компании</h3>
                        <ul>
                            <li><a href="/about">О магазине</a></li>
                            <li><a href="/payment">Оплата заказов</a></li>
                            <li><a href="/how-to-buy">Как купить</a></li>
                            <li><a href="/return">Возврат и обмен</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Юридическим лицам</h3>
                        <ul>
                            <li><a href="/for-business">Для юридических лиц</a></li>
                            <li><a href="/contract">Договор поставки</a></li>
                            <li><a href="/personal-data">Персональные данные</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Правовая информация</h3>
                        <ul>
                            <li><a href="/privacy">Политика конфиденциальности</a></li>
                            <li><a href="/terms">Пользовательское соглашение</a></li>
                            <li><a href="/data-agreement">Согласие на передачу данных</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Контакты</h3>
                        <div className="contact-info">
                            <p>Свяжитесь с нами:</p>
                            <a href="mailto:info@kdvonline.ru" className="contact-link">
                                DonFan@gmail.com
                            </a>
                            <p className="support-title">Служба поддержки:</p>
                            <a href="tel:88002505555" className="phone-link">
                                8 919 230 03 07
                            </a>
                            <p className="work-hours">
                                7 дней в неделю с 07:00 до 19:00 по московскому времени, 
                                для звонков по РФ, звонок бесплатный
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="social-links">
                        <span>Мы в соцсетях:</span>
                        {/* <a href="https://vk.com/kdvgroup" aria-label="ВКонтакте" className="social-link">
                            <img src={VkIcon} alt="VK" className="social-icon" />
                        </a> */}
                        <a href="https://t.me/chinesefod72" aria-label="Телеграм" className="social-link">
                            <img src={TelegramIcon} alt="Telegram" className="social-icon" />
                        </a>
                    </div>
                    
                </div>
            </div>
        </footer>
    )
}