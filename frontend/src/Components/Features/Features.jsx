import React from 'react';
import './Features.css'; // Import your CSS file
import I1 from '../Assets/Features/24hours.jpg';
import I2 from '../Assets/Features/Delivery.jpg';
import I3 from '../Assets/Features/Fresh.jpeg';
import I4 from '../Assets/Features/Payments.jpg';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section className="features" id="features">
      <h1 className="heading">Our<span>Features</span></h1>
      <div className="features-container">
        <div className="feature">
        <Link to="/customercare" ><img src={I1} className="feature-image" alt="24/7 Customer Care" /></Link>
          <div className="feature-content">
            <h6 className="feature-title">24/7 Customer Care</h6>
          </div>
        </div>
        <div className="feature">
          <img src={I2} className="feature-image" alt="Fast Delivery" />
          <div className="feature-content">
            <h6 className="feature-title">Fast Delivery</h6>
          </div>
        </div>
        <div className="feature">
          <img src={I3} className="feature-image" alt="Fresh And Organic" />
          <div className="feature-content">
            <h6 className="feature-title">Fresh And Organic</h6>
          </div>
        </div>
        <div className="feature">
          <img src={I4} className="feature-image" alt="Easy Payments" />
          <div className="feature-content">
            <h6 className="feature-title">Easy Payments</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
