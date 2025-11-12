import testObject from '../testObject.json'
import ProductSection from '../ProductSection/ProductSection'

export default function Novelty({ setBasket }:{ setBasket: any }) {
    const noveltyProducts = testObject.data.filter((product) => product.novelty)

    return (
        <ProductSection
            title="Новинки"
            products={noveltyProducts}
            setBasket={setBasket}
            maxItems={8}
        />
    )
}