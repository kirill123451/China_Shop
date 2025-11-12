import './App.css'
import Header from './Header/Header'
import Carousel from './Carousel/Carousel'
import CategoriesForMainMenu from './CategoriesForMainMenu/CategoriesForMainMenu'
import Novelty from './Novelty/Novelty'
import { useEffect, useState } from 'react'
import Hits from './Hits/Hits'
import Footer from './Footer/Footer'

function App() {
  const [basket, setBasket] = useState([])
  useEffect(() => {
    console.log(basket)
  }, [basket])

  return (
    <>
      <Header />
      <Carousel />
      <CategoriesForMainMenu />
      <Novelty setBasket = {setBasket} />
      <Hits setBasket={setBasket} />
      <Footer />
    </>
  )
}

export default App
