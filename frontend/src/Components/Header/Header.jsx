import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your CSS file for header styles
import companylogo from '../Assets/Features/companylogo.png';
import PersonIcon from '@mui/icons-material/Person';
import { ShopContext } from '../Context/ShopContext';

const Header = () => {
  const {cart} = useContext(ShopContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const userid = localStorage.getItem('userid');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log(showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userid');
    setShowDropdown(false);
    window.location.replace('/');
  };
  const handlebutton = () => {
    setShowDropdown(false);
  };

  const totalCartItems = cart.items.reduce((total, item) => total + item.quantity, 0);


  return (
    <header className="header">
      <div className="logo-container">
        <img src={companylogo} alt="Company Logo" className="logo-img" />
        <span className="company-name">Kisan Organics</span>
      </div>
      <div className="menu-container">
        <Link to="/cart">
        <div className="cart-count-container">
            <FontAwesomeIcon icon={faShoppingCart} className="menu-button" />
            <span className="cart-count">{totalCartItems}</span>
          </div>
        </Link>
        {localStorage.getItem('auth-token') ? (
          <div className="user-dropdown-container">
            <button className="menu-button" onClick={toggleDropdown}>
              <PersonIcon />
            </button>
            {showDropdown && (
              <div className="user-dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
                <Link to={`/profile/${userid}`}>
                  <button onClick={handlebutton} >Profile</button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <button className="menu-button">
              <PersonIcon />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
