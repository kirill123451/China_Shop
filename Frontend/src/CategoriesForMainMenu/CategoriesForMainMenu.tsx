import { useState } from "react" 
import './CategoriesForMainMenu.css' 
import testObject from '../testObject.json' 
import { Link } from "react-router-dom" 

interface Product {
    id: number 
    type: string 
    name?: string 
    description: string 
    photo: string 
}

interface CategoriesForMainMenuProps {
    isHeaderMenu?: boolean 
    isMobile?: boolean 
    onCategorySelect?: () => void
}

export default function CategoriesForMainMenu({ isHeaderMenu, isMobile, onCategorySelect }: CategoriesForMainMenuProps) {
    const [showAll, setShowAll] = useState(isHeaderMenu || false) 
    const displayedCategories = showAll ? testObject.data : testObject.data.slice(0, 6) 

    const handleCategoryClick = () => {
        if (onCategorySelect) {
            onCategorySelect()
        }
    }

    if (isHeaderMenu) {
        return (
            <div className={`categories-grid-header ${isMobile ? 'mobile' : ''}`}>
                {testObject.data.map((data) => (
                    <Link
                        to={`/category/${data.type}`}
                        key={data.id}
                        className="category-card-link"
                        onClick={handleCategoryClick} 
                    >
                        <div className="category-item-header">
                            {!isMobile && (
                                <img src={data.photo} alt={data.name} className="category-image-header" />
                            )}
                            <span className="category-text-header">{data.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        ) 
    }

    return (
        <div className={`categories-container ${isHeaderMenu ? 'categories-container--header' : ''}`}>
            {!isHeaderMenu && <h2>Категории</h2>}
            <div className="categories-grid">
                {displayedCategories.map((data) => (
                    <Link
                        to={`/category/${data.type}`}
                        key={data.id}
                        className="category-card-link"
                    >
                        <div className="category-card">
                            <img src={data.photo} alt={data.description} className="category-image" />
                            <span className="category-text">{data.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
            {(testObject.data.length > 6 && !isHeaderMenu) && (
                <button
                    className="show-more-btn"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Свернуть' : 'Показать ещё'}
                </button>
            )}
        </div>
    ) 
}