import './App.css'
import Header from './Header/Header'
import Carousel from './Carousel/Carousel'
import CategoriesForMainMenu from './CategoriesForMainMenu/CategoriesForMainMenu'
import Novelty from './Novelty/Novelty'
import { useEffect, useState } from 'react'
import Hits from './Hits/Hits'
import Footer from './Footer/Footer'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import ProductPage from './ProductPage/ProductPage'
import testObject from './testObject.json'
import ProductSection from './ProductSection/ProductSection'
import LoginButton from './LoginButton/LoginButton'

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

interface TestObjectData {
    data: Product[] 
}

const typedTestObject: TestObjectData = testObject as TestObjectData 

// Layout с Header и Footer
const LayoutWithHeaderFooter = () => (
  <>
    <Header />
    <Outlet /> {/* Здесь будут отображаться дочерние компоненты */}
    <Footer />
  </>
)

function App() {
    const [basket, setBasket] = useState<Product[]>([]) 

    useEffect(() => {
        console.log(basket) 
    }, [basket]) 

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutWithHeaderFooter />}>
                    <Route path='/' element={
                        <>
                            <Carousel />
                            <CategoriesForMainMenu />
                            <Novelty setBasket={setBasket} />
                            <Hits setBasket={setBasket} />
                        </>
                    } />
                    <Route
                        path='/product/:id'
                        element={<ProductPage setBasket={setBasket} products={typedTestObject.data} />}
                    />
                    <Route
                        path='/category/:type'
                        element={<ProductSection setBasket={setBasket} products={typedTestObject.data} />}
                    />
                </Route>
                
                <Route path='/login' element={<LoginButton />} />
            </Routes>
        </BrowserRouter>
    ) 
}

export default App 