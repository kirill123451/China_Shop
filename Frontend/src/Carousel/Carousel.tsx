import { useState, useEffect } from "react"
import './Carousel.css'
import CarouselDesktop1 from './PhotoCarousel/CarouselDesktop1.png'
import CarouselDesktop2 from './PhotoCarousel/CarouselDesktop2.png'
import CarouselDesktop3 from './PhotoCarousel/CarouselDesktop3.png'
import CarouselMobile1 from './PhotoCarousel/CarouselMobile1.png'
import CarouselMobile2 from './PhotoCarousel/CarouselMobile2.png'
import CarouselMobile3 from './PhotoCarousel/CarouselMobile3.png'


export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const totalSlides = 3
    
    function sliderCheckRight() {        
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    function sliderCheckLeft() {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            sliderCheckRight()
        }, 5000)
        
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="carousel">
             <div 
                className="carousel-inner"
                style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
            >
                <div className="carousel-item slide-1">
                    <div className="slide-content">
                        <picture>
                            <source media="(min-width: 769px)" srcSet={CarouselDesktop1} />
                            <source media="(max-width: 768px)" srcSet={CarouselMobile1} />
                            <img src={CarouselDesktop1} alt="Слайд 1" className="carousel-image" />
                        </picture>
                    </div>
                </div>
                <div className="carousel-item slide-2">
                    <div className="slide-content">
                        <picture>
                            <source media="(min-width: 769px)" srcSet={CarouselDesktop2} />
                            <source media="(max-width: 768px)" srcSet={CarouselMobile2} />
                            <img src={CarouselDesktop2} alt="Слайд 2" className="carousel-image" />
                        </picture>
                    </div>
                </div>
                <div className="carousel-item slide-3">
                    <div className="slide-content">
                        <picture>
                            <source media="(min-width: 769px)" srcSet={CarouselDesktop3} />
                            <source media="(max-width: 768px)" srcSet={CarouselMobile3} />
                            <img src={CarouselDesktop3} alt="Слайд 3" className="carousel-image" />
                        </picture>
                    </div>
                </div>
            </div>
            
            <button className="carousel-btn carousel-btn-prev" onClick={sliderCheckLeft}>‹</button>                
            <button className="carousel-btn carousel-btn-next" onClick={sliderCheckRight}>›</button>   
        </div>
    )
}