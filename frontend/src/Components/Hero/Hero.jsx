import React,{ useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.css';
import bg from '../Assets/Banners/Home1.jpg';
import bg1 from '../Assets/Banners/Home2.jpg';
import bg2 from '../Assets/Banners/Home3.jpg';



const Hero = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
      const interval = setInterval(() => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      }, 3000); // Change the interval time as needed (3000ms = 3 seconds)
  
      return () => clearInterval(interval);
    }, []);
    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,       // Add autoplay setting
      autoplaySpeed: 3000,
    };
  
    return (
      <div className='hero'>
        <Slider {...settings}>
          <a href='/traps' className="hero-slide">
            <img  src={bg} alt="Slide 1" />
          </a>
          <a href='/neemoil' className="hero-slide">
            <img src={bg1} alt="Slide 2" />
          </a>
          {/* <div className="hero-slide">
            <img src={bg2} alt="Slide 3" />
          </div> */}
        </Slider>
      </div>
    );
  }
  
  export default Hero;
  