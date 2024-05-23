import React from 'react';
import './CcHero.css';
import cc from '../Assets/Banners/CropCare.jpg';

const CcHero = () => {
    return (
        <div>
            <div className="ccbanner">
                <a href='/cropcare' className="hero-slide">
                    <img src={cc} alt="Slide 1" />
                </a>
            </div>
        </div>
    )
}

export default CcHero