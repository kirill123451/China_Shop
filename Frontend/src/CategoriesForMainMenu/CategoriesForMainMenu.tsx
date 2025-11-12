import { useState } from "react"
import './CategoriesForMainMenu.css'
import testObject from '../testObject.json'

interface CategoriesForMainMenuProps {
    isHeaderMenu? : boolean
}

export default function CategoriesForMainMenu({isHeaderMenu}: CategoriesForMainMenuProps) {
    const [showAll, setShowAll] = useState(isHeaderMenu || false)
    const displayedCategories = showAll ? testObject.data : testObject.data.slice(0, 6)

    return (
        <div className={`categories-container ${isHeaderMenu ? 'categories-container--header' : ''}`}>
            {!isHeaderMenu && <h2>Категории</h2>}
            <div className="categories-grid">
                {displayedCategories.map((data, id) => (
                    <div key={id} className="category-card">
                        <img src={data.photo} alt={data.description} className="category-image" />
                        <span className="category-text">{data.description}</span>
                    </div>
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