import React from 'react';
import './Footer.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <p>KISAN ORGANICS</p>
      </div>
      <div className="footer-icons">
        {/* Link each icon to its respective social media site */}
        <a href="https://www.youtube.com/@kisanorganics5626">
          <YouTubeIcon className="icon" style={{ fontSize: 30 }} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100081277447045&mibextid=ZbWKwL">
          <FacebookIcon className="icon" style={{ fontSize: 30 }} />
        </a>
        <a href="https://www.instagram.com/kisanorganics/">
          <InstagramIcon className="icon" style={{ fontSize: 30 }} />
        </a>
        <a href="https://goo.gl/maps/2u9TSifyNGA7t2TS6">
          <PlaceIcon className="icon" style={{ fontSize: 30 }} />
        </a>
      </div>
      <ul className="footer-links">
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-copyright">
        <hr />
        <p>copyright @ 2023 - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
