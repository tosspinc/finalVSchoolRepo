import React, { useState } from 'react';
import "../cssFiles/carousel.css"
//import { motion, AnimatePresence } from 'framer-motion';
import image1 from '/src/assets/Imgs/productpics/homeappliancepics/applianceparts/microwave/diodes/WB18x10449/frontview.jpg';
import image2 from '/src/assets/Imgs/productpics/homeappliancepics/applianceparts/microwave/diodes/wb26x28935/frontview.png';
import image3 from '/src/assets/Imgs/productpics/homeappliancepics/applianceparts/microwave/diodes/wb27x1160/sideview.jpg';
import image4 from '/src/assets/Imgs/productpics/homeappliancepics/applianceparts/microwave/diodes/wb27x25616/sideview.jpg';

export default function Carousel() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        image1,
        image2,
        image3,
        image4
    ]

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>  (prevIndex + 1) % images.length)
    } 

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const handleDotClick = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className='carousel-container'>
            <div className="carousel">
                <div className='image-container'>
                    <button className="left" onClick={handlePrev}>Left</button>
                        <img
                            key={currentIndex}
                            src={images[currentIndex]}
                            className='carousel-image'
                            alt={`Image ${currentIndex + 1}`}
                        />
                    <button className="right" onClick={handleNext}>Right</button>
                </div>
                <div className="indicator">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
