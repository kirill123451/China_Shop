import testObject from '../testObject.json'
import ProductSection from '../ProductSection/ProductSection'

export default function Hits({ setBasket }: { setBasket: any }) {
    const hitProducts = testObject.data.filter((product) => product.hit)

    return (
        <ProductSection
            title="Хиты продаж"
            products={hitProducts}
            setBasket={setBasket}
            maxItems={16}
        />
    )
}