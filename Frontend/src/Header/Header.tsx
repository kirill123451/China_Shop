import { useState, useRef, useEffect } from 'react';
import './Header.css';
import Logo from '../photo/Logo.png';
import buttonCart from '../photo/buttonCart.png';
import LoginButton from '../photo/logIn.png';
import CategoriesForMainMenu from '../CategoriesForMainMenu/CategoriesForMainMenu';

export default function Header() {
    const [searchData, setSearchData] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [isCatalogOpen, setIsCatalogOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Поиск:', searchData)
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible)
    };

    const closeSearch = () => {
        setIsSearchVisible(false)
        setSearchData('')
    };

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchVisible])

    const handleMouseEnterCatalog = () => setIsCatalogOpen(true);
    const handleMouseLeaveCatalog = () => setIsCatalogOpen(false);

    return (
        <div className='Header-inline'>
            {/* Левая группа: логотип и каталог */}
            <div className="Header-left">
                <div className="Header-logo">
                    <img src={Logo} alt='Логотип магазина китайских сладостей' />
                </div>
                <div 
                    className="Catalog-container" 
                    onMouseEnter={handleMouseEnterCatalog} 
                    onMouseLeave={handleMouseLeaveCatalog}
                >
                    <div className="Header-catalog">
                        <button className='Header-button Header-button-catalog'>
                            <span className="catalog-icon">☰</span>
                            <span className="catalog-text">Каталог</span>
                        </button>
                    </div>

                    {isCatalogOpen && (
                        <div className="Catalog-dropdown-wrapper"> 
                            <CategoriesForMainMenu isHeaderMenu={true}/>
                        </div>
                    )}
                </div>
            </div>

            {/* Центр: поиск */}
            <div className="Header-center">
                <div className="Header-search Header-search-desktop">
                    <form onSubmit={handleSearch}>
                        <input 
                            className='Header-search-field' 
                            type='search' 
                            placeholder='Найти вкусняшку...' 
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                        <button className='Header-button Header-search-button' type='submit'>
                            <span className="search-text">Поиск</span>
                            <span className="search-icon">🔍</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Правая группа: вход и корзина */}
            <div className="Header-right">
                {/* Мобильный поиск */}
                <div className="Header-search Header-search-mobile">
                    <button 
                        className='Header-button Header-search-toggle' 
                        onClick={toggleSearch}
                        aria-label="Поиск"
                    >
                        🔍
                    </button>
                    
                    {isSearchVisible && (
                        <div className="search-overlay">
                            <div className="search-overlay-content">
                                <form onSubmit={handleSearch} className="search-overlay-form">
                                    <input 
                                        ref={searchInputRef}
                                        className='Header-search-field search-overlay-field' 
                                        type='search' 
                                        placeholder='Найти вкусняшку...' 
                                        value={searchData}
                                        onChange={(e) => setSearchData(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        className="search-close-btn"
                                        onClick={closeSearch}
                                        aria-label="Закрыть поиск"
                                    >
                                        ✕
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Кнопка входа с иконкой */}
                <div className="Header-auth">
                    <button className='Header-button Header-button-auth'>
                        <img src={LoginButton} alt="Войти" className="auth-icon-desktop" />
                        <span className="auth-text">Войти</span>
                        <img src={LoginButton} alt="Войти" className="auth-icon-mobile" />
                    </button>
                </div>

                {/* Корзина */}
                <div className="Header-cart">
                    <button className='Header-button Header-button-cart'>
                        <img className='Header-cart-img' src={buttonCart} alt='Корзина' />
                    </button>
                </div>
            </div>
        </div>
    );
}