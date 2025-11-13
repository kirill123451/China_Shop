import { useState } from "react"
import { useParams } from "react-router-dom"
import './ProductPage.css'

export interface Product {
    id: number;
    type: string;
    name?: string;
    description: string;
    photo: string;
    price: number;
    taste?: string;        
    weight?: string;       
    compound?: string;     
    proteins?: string;     
    fats?: string;         
    carbs?: string;        
    calories?: string;     
    hit?: boolean;         
    novelty?: boolean;     
}

interface ProductSectionProps {
  products: Product[];
  setBasket: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductPage({ products, setBasket }: ProductSectionProps) {
    const [activeTab, setActiveTab] = useState<'reviews' | 'description'>('reviews')

    const { id } = useParams()
    const currentProduct = products.find(step => step.id === Number(id))

    if (!currentProduct) {
        return <div className="product-page-not-found">Товар не найден</div>;
    }

    const addToBasket = () => {
        setBasket((prev) => [...prev, currentProduct])
    }

    return (
        <div className="product-page">
            <div className="product-page-main">
                <div className="product-page-image-block">
                    <img 
                        className="product-page-image" 
                        src={currentProduct.photo} 
                        alt="Фото товара" 
                    />
                </div>
                
                <div className="product-page-info">
                    <div className="product-badges">
                        {currentProduct.novelty && (
                            <span className="badge badge-new">Новинка</span>
                        )}
                        {currentProduct.hit && (
                            <span className="badge badge-hit">Хит</span>
                        )}
                    </div>
                    
                    <div className="product-page-text-title">
                        {currentProduct.name || currentProduct.description}
                    </div>
                    
                    <div className="product-page-text-price">
                        {currentProduct.price}₽
                    </div>
                    
                    <button 
                        className="product-page-add-to-cart"
                        onClick={addToBasket}
                    >
                        В корзину
                    </button>

                    <div className="product-page-text-health">
                        Пищевая ценность на 100 г
                    </div>
                    
                    <div className="product-page-nutrition-grid">
                        <div className="nutrition-item">
                            <span className="nutrition-value">{currentProduct.proteins}</span>
                            <span className="nutrition-label">Белки</span>
                        </div>
                        <div className="nutrition-item">
                            <span className="nutrition-value">{currentProduct.fats}</span>
                            <span className="nutrition-label">Жиры</span>
                        </div>
                        <div className="nutrition-item">
                            <span className="nutrition-value">{currentProduct.carbs}</span>
                            <span className="nutrition-label">Углеводы</span>
                        </div>
                        <div className="nutrition-item">
                            <span className="nutrition-value">{currentProduct.calories}</span>
                            <span className="nutrition-label">Ккал</span>
                        </div>
                    </div>

                    <div className="product-page-text-description">
                        {currentProduct.description}
                    </div>
                    
                    <div className="product-page-text-compound">
                        <strong>Состав:</strong> {currentProduct.compound}
                    </div>
                </div>
            </div>

            <div className="product-page-reviews-or-description">
                <div className="tab-buttons">
                    <button 
                        className={`product-page-button-review ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Отзывы
                    </button>
                    <button 
                        className={`product-page-button-description ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Описание товара
                    </button>
                </div>
                
                <div className="tab-content">
                    {activeTab === 'reviews' ? (
                        <div className="reviews-content">
                            <h3>Отзывы о товаре</h3>
                            <p>Здесь будут отзывы покупателей</p>
                            <div style={{marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px'}}>
                                <div style={{fontSize: '24px', color: '#ffc107', marginBottom: '10px'}}>★★★★☆</div>
                                <span>Средняя оценка: 4.2/5</span>
                            </div>
                        </div>
                    ) : (
                        <div className="description-content">
                            <div className="detail-item">
                                <span className="detail-label">Вкус</span>
                                <span className="detail-value">{currentProduct.taste}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Вес</span>
                                <span className="detail-value">{currentProduct.weight}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Категория</span>
                                <span className="detail-value">{currentProduct.type}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Производитель</span>
                                <span className="detail-value">FreshFood Company</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}