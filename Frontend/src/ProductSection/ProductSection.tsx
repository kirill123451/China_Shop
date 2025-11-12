import './ProductSection.css'

interface Product {
  photo: string;
  description: string;
  price: number;
  novelty?: boolean;
  hit?: boolean;
}

interface ProductSectionProps {
  title?: string;
  products: Product[];
  setBasket: React.Dispatch<React.SetStateAction<Product[]>>;
  maxItems?: number;
}

export default function ProductSection({ 
  title = '', 
  products, 
  setBasket,
  maxItems = 8
}: ProductSectionProps) {

    function addToBasket(product: Product) {
        setBasket((prev) => [...prev, product])
    }

    return (
        <div className="product-section-container">
            <h2>{title}</h2>
            <div className="product-section-grid">
                {products.slice(0, maxItems).map((data, id) => (
                    <div key={id} className="product-section-card">
                        <img src={data.photo} alt={data.description} className="product-section-image" />
                        <span className="product-section-text">{data.description}</span>
                        <span className='product-section-price'>{data.price}₽</span>
                        <button 
                            className='product-section-button-addToCart' 
                            onClick={() => addToBasket(data)}
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
                ))}
            </div>
        </div>
    )
}