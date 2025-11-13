import { useState, useRef, useEffect } from 'react' 
import './Header.css' 
import Logo from '../photo/Logo.png' 
import buttonCart from '../photo/buttonCart.png' 
import LoginButton from '../photo/logIn.png' 
import CategoriesForMainMenu from '../CategoriesForMainMenu/CategoriesForMainMenu'
import { Link } from 'react-router-dom'

export default function Header() {
    const [searchData, setSearchData] = useState('') 
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [isCatalogOpen, setIsCatalogOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const catalogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const catalogRef = useRef<HTMLDivElement>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Поиск:', searchData)
    } 

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible)
    } 

    const closeSearch = () => {
        setIsSearchVisible(false)
        setSearchData('')
    } 

    const toggleCatalog = () => {
        setIsCatalogOpen(!isCatalogOpen)
    }

    const closeCatalog = () => {
        setIsCatalogOpen(false)
    }

    const handleCategorySelect = () => {
        closeCatalog()
    }

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            searchInputRef.current.focus() 
        }
    }, [isSearchVisible])

    const handleMouseEnterCatalog = () => {
        if (window.innerWidth > 768) { 
            if (catalogTimeoutRef.current) {
                clearTimeout(catalogTimeoutRef.current) 
            }
            setIsCatalogOpen(true)
        }
    } 

    const handleMouseLeaveCatalog = () => {
        if (window.innerWidth > 768) { 
            catalogTimeoutRef.current = setTimeout(() => {
                setIsCatalogOpen(false)
            }, 150)
        }
    } 

    const handleMouseEnterDropdown = () => {
        if (window.innerWidth > 768) {
            if (catalogTimeoutRef.current) {
                clearTimeout(catalogTimeoutRef.current) 
            }
        }
    } 

    const handleMouseLeaveDropdown = () => {
        if (window.innerWidth > 768) { 
            catalogTimeoutRef.current = setTimeout(() => {
                setIsCatalogOpen(false)
            }, 150)
        }
    } 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (catalogRef.current && 
                !catalogRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('.Catalog-dropdown-wrapper') &&
                !(event.target as Element).closest('.Catalog-mobile-sidebar')) {
                setIsCatalogOpen(false) 
            }
        } 

        document.addEventListener('mousedown', handleClickOutside) 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside) 
        } 
    }, []) 

    useEffect(() => {
        if (isCatalogOpen && window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isCatalogOpen])

    return (
        <div className="header-wrapper" ref={headerRef}>
            <div className='Header-inline'>
                {/* Левая группа: логотип и каталог */}
                <div className="Header-left">
                    <Link to={'/'} >
                        <div className="Header-logo">
                            <img src={Logo} alt='Логотип магазина китайских сладостей' />
                        </div>
                    </Link>
                    <div 
                        className="Catalog-container" 
                        onMouseEnter={handleMouseEnterCatalog} 
                        onMouseLeave={handleMouseLeaveCatalog}
                        ref={catalogRef}
                    >
                        <div className="Header-catalog">
                            <button 
                                className='Header-button Header-button-catalog'
                                onClick={toggleCatalog}
                            >
                                <span className="catalog-icon">☰</span>
                                <span className="catalog-text">Каталог</span>
                            </button>
                        </div>
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
                    <Link to={`/login`} >
                    <div className="Header-auth">
                        <button className='Header-button Header-button-auth'>
                            <img src={LoginButton} alt="Войти" className="auth-icon-desktop" />
                            <span className="auth-text">Войти</span>
                            <img src={LoginButton} alt="Войти" className="auth-icon-mobile" />
                        </button>
                    </div>
                    </Link>

                    {/* Корзина */}
                    <div className="Header-cart">
                        <button className='Header-button Header-button-cart'>
                            <img className='Header-cart-img' src={buttonCart} alt='Корзина' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Десктопное выпадающее меню */}
            {isCatalogOpen && window.innerWidth > 768 && (
                <div 
                    className="Catalog-dropdown-wrapper"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                > 
                    <div className="catalog-dropdown-content">
                        <CategoriesForMainMenu 
                            isHeaderMenu={true} 
                            isMobile={false}
                            onCategorySelect={handleCategorySelect}
                        />
                    </div>
                </div>
            )}

            {/* Мобильное боковое меню */}
            {isCatalogOpen && window.innerWidth <= 768 && (
                <>
                    <div className="catalog-mobile-overlay" onClick={closeCatalog}></div>
                    <div className="Catalog-mobile-sidebar">
                        <div className="catalog-mobile-header">
                            <h3>Каталог</h3>
                            <button 
                                className="catalog-mobile-close"
                                onClick={closeCatalog}
                                aria-label="Закрыть каталог"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="catalog-mobile-content">
                            <CategoriesForMainMenu 
                                isHeaderMenu={true} 
                                isMobile={true}
                                onCategorySelect={handleCategorySelect}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}