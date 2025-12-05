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

interface LayoutProps {
    isAuthenticated: boolean;
    handleLogout: () => void;
}

const LayoutWithHeaderFooter: React.FC<LayoutProps> = ({ isAuthenticated, handleLogout }) => (
  <>
    <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    <Outlet /> {/* Здесь будут отображаться дочерние компоненты */}
    <Footer />
  </>
)

function App() {
    const [basket, setBasket] = useState<Product[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        checkAuthStatus()
    },[])

    const checkAuthStatus = () => {
        const userId = localStorage.getItem('userId')

        if(userId) setIsAuthenticated(true)
        else setIsAuthenticated(false)
        setIsLoading(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setIsAuthenticated(false)
    } 

    useEffect(() => {
        console.log(basket) 
    }, [basket]) 

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutWithHeaderFooter isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>}>
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