import React from 'react';
import './About.css';
import Image1 from '../Assets/pics/Products.JPG'; // Import your images
import Image2 from '../Assets/pics/Crop.JPG';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <h2>About Kisan Organics</h2>
        <p>
          At Kisan Organics, we are passionate about promoting sustainable agriculture and empowering farmers to grow healthy crops while preserving the environment. Located in Dachepalli, Guntur District, Andhra Pradesh, India, we specialize in providing high-quality organic fertilizers and guidance to farmers.
        </p>
        <p>
          Our mission at Kisan Organics is to revolutionize farming practices by offering natural and environmentally friendly solutions that enhance soil health, crop yield, and farmer livelihoods. We believe in the power of organic farming to create a healthier planet for future generations.
        </p>
        <div className="product-section">
          <h3>Our Products and Services</h3>
          <div className="product-item">
            <img src={Image1} alt="Organic Fertilizers" />
            <p>Organic Fertilizers</p>
            <p>Our range of organic fertilizers is carefully crafted to nourish the soil, enrich plant growth, and improve crop quality. From composts to biofertilizers, we offer eco-friendly solutions tailored to meet the diverse needs of farmers.</p>
          </div>
          <div className="product-item">
            <img src={Image2} alt="Farmer Guidance" />
            <p>Farmer Guidance</p>
            <p>In addition to providing top-quality fertilizers, we offer personalized guidance and support to farmers. Our team of experts is dedicated to sharing best practices, offering consultations, and conducting workshops to help farmers maximize their yields sustainably.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
