import React from 'react';
import './CustomerSupportBanner.css';
import cg from '../Assets/Banners/customersupport.png'
import { Link } from 'react-router-dom';

const CustomerSupportBanner = () => {
  return (
    <div className="banner-container">
      <div className="avatar-container">
        <img
          src={cg}
          alt="Customer Support Avatar"
          className="avatar"
        />
      </div>
      <div className="content-container">
        <h2>Need Help?</h2>
        <p>Our support team is here for you.</p>
      
      <div className="button-container">
        <Link to="/customercare"><button className="support-button">Contact Us</button></Link>
      </div></div>
    </div>
  );
};

export default CustomerSupportBanner;
