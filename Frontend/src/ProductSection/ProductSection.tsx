import './ProductSection.css' 
import { Link, useParams } from 'react-router-dom' 

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
    title?: string 
    products: Product[] 
    setBasket: React.Dispatch<React.SetStateAction<Product[]>> 
    maxItems?: number 
    currentCategory?: boolean 
}

export default function ProductSection({
    title = '',
    products,
    setBasket,
    maxItems,
}: ProductSectionProps) {
    const { type } = useParams<{ type: string }>() 

    function addToBasket(e: React.MouseEvent, product: Product) {
        e.preventDefault()
        e.stopPropagation()
        setBasket((prev) => [...prev, product])
    }

    const displayedProducts = type
        ? products.filter(product => product.type === type)
        : products

    if (type && displayedProducts.length === 0) {
        return (
            <div className="product-section-container">
                <h2>Категория не найдена</h2>
                <p>Товары в категории "{type}" не найдены.</p>
            </div>
        )
    }

    return (
        <div className="product-section-container">
            <h2>{title || (type ? `Категория: ${type}` : 'Все товары')}</h2>
            <div className="product-section-grid">
                {displayedProducts.slice(0, maxItems).map((data) => (
                    <Link
                        to={`/product/${data.id}`}
                        key={data.id}
                        className="product-section-card-link"
                    >
                        <div className="product-section-card">
                            <img src={data.photo} alt={data.description} className="product-section-image" />
                            <span className="product-section-text">{data.name}</span>
                            <span className='product-section-price'>{data.price}₽</span>
                            <button
                                className='product-section-button-addToCart'
                                onClick={(e) => addToBasket(e, data)}
                            >
                                В корзину
                            </button>

                            {data.novelty && (
                                <span className='product-section-label-new'>Новинка</span>
                            )}
                            {data.hit && (
                                <span className='product-section-label-hit'>Хит</span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) 
}