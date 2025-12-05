import { useState, useRef, useEffect } from 'react' 
import './Header.css' 
import Logo from '../photo/Logo.png' 
import buttonCart from '../photo/buttonCart.png' 
import LoginButton from '../photo/logIn.png' 
import CategoriesForMainMenu from '../CategoriesForMainMenu/CategoriesForMainMenu'
import { Link, useNavigate } from 'react-router-dom'

interface HeaderProps {
    isAuthenticated: boolean
    handleLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, handleLogout }) => {
    const [searchData, setSearchData] = useState('') 
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const [isCatalogOpen, setIsCatalogOpen] = useState(false)
    const [authState, setAuthState] = useState(!!localStorage.getItem('userId'))
    const searchInputRef = useRef<HTMLInputElement>(null)
    const catalogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const catalogRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // Обновляем authState при изменении localStorage
    useEffect(() => {
        const checkAuth = () => {
            setAuthState(!!localStorage.getItem('userId'))
        }
        
        // Проверяем при монтировании
        checkAuth()
        
        // Слушаем изменения в localStorage
        const handleStorageChange = () => {
            checkAuth()
        }
        
        window.addEventListener('storage', handleStorageChange)
        
        // Также проверяем при каждом рендере для надежности
        const interval = setInterval(checkAuth, 1000)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            clearInterval(interval)
        }
    }, [])

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

    const handleLogoutClick = () => {
        localStorage.removeItem('userId')
        setAuthState(false) // Немедленно обновляем состояние
        if (handleLogout) {
            handleLogout() // Вызываем пропс если он передан
        }
        // Перезагружаем страницу для гарантированного обновления
        window.location.reload()
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

                    {/* Кнопка входа/выхода */}
                    <div className="Header-auth">
                        {authState ? (
                            <button 
                                className='Header-button Header-button-auth' 
                                onClick={handleLogoutClick}
                            >
                                <span className="auth-text">Выйти</span>
                            </button>
                        ) : (
                            <Link to={`/login`}>
                                <button className='Header-button Header-button-auth'>
                                    <img src={LoginButton} alt="Войти" className="auth-icon-desktop" />
                                    <span className="auth-text">Войти</span>
                                    <img src={LoginButton} alt="Войти" className="auth-icon-mobile" />
                                </button>
                            </Link>
                        )}
                    </div>
                    
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

export default Header