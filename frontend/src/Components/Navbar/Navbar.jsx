import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import cart_icon from '../Assets/cart_icon.png';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const { setUserIdAndUpdateCart } = useContext(ShopContext);
  const [showAllProductsDropdown, setShowAllProductsDropdown] = useState(false);

  // Use location to get the current path
  const location = useLocation();

  useEffect(() => {
    // Extract the path from the location object
    const path = location.pathname;

    // Map the path to the corresponding menu item and set it as active
    if (path === '/') {
      setActiveMenuItem('item1');
    } else if (path === '/all') {
      setActiveMenuItem('item2');
    } else if (path === '/about') {
      setActiveMenuItem('item3');
    }  else if (path === '/cropcare') {
      setActiveMenuItem('item4');
    }
    // Add more conditions for other pages if needed
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    // Add any additional logic you need when a menu item is clicked
  };

  const handleCartClick = async () => {
    // Get the user ID from localStorage or from any other source you have
    const userId = localStorage.getItem('userid');
    if (userId) {
      // Call the setUserIdAndUpdateCart function to fetch cart and user ID details
      await setUserIdAndUpdateCart(userId);
    }
  };

  const handleToggleDropdown = () => {
    setShowAllProductsDropdown(!showAllProductsDropdown);
  };

  const handleAllProductsItemClick = () => {
    // Close the dropdown when an item is clicked
    setShowAllProductsDropdown(false);
    // Call the existing function for clicking "All Products"
    handleMenuItemClick('item2');
  };

  return (
    <div className={`navbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
  <div className="nav-content">
    <div className="menu-btn" onClick={handleToggleSidebar}>
      <MenuIcon className='nav-icon' style={{ fontSize: 35 }} />
    </div>
    <div className="search-bar-m">
    <input
        type="text"
        placeholder="Search..."
      />
      <button ><SearchIcon /></button>
      </div>
  </div>
  <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
    <div className="sidebar-header" onClick={handleSidebarClose}>
      <CloseIcon/> 
    </div>
    <a
      href="/"
      className={activeMenuItem === 'item1' ? 'active' : ''}
      onClick={() => handleMenuItemClick('item1')}
    >
      <HomeIcon />Home
    </a>

    <a
      href="/cropcare"
      className={activeMenuItem === 'item4' ? 'active' : ''}
      onClick={() => handleMenuItemClick('item4')}
    >
      <HomeIcon />CropCare
    </a>

    {/* All Products dropdown */}
    <div className={`dropdown ${showAllProductsDropdown ? 'show' : ''}`}>
      <div className='dropdownmix'>
        <a
        href="/all"
        className={`dropdown-header ${activeMenuItem === 'item2' ? 'active' : ''}`}
        onClick={() => handleMenuItemClick('item2')}
      >
        <LocalGroceryStoreIcon />
        <span>All Products</span>
      </a>
      <a className="arrow-icon" onClick={handleToggleDropdown}>
        <ArrowDropDownIcon className={showAllProductsDropdown ? 'rotate' : ''} />
      </a>
      </div>
      <div className={`dropdown-menu ${showAllProductsDropdown ? 'show' : ''}`}>
        {/* Add dropdown items here */}
        <a href="/traps" onClick={handleAllProductsItemClick}>Sticky Traps</a>
        <a href="/neemoil" onClick={handleAllProductsItemClick}>Neem Oil</a>
        <a href="/mixingoil" onClick={handleAllProductsItemClick}>Mixing Oil</a>
        <a href="/powder" onClick={handleAllProductsItemClick}>Powder</a>
        {/* Add more categories if needed */}
      </div>
    </div>
    <a
      href="/about"
      className={activeMenuItem === 'item3' ? 'active' : ''}
      onClick={() => handleMenuItemClick('item3')}
    >
      <BusinessIcon /> About Us
    </a>
    <div className="search-bar-l">
    <input
        type="text"
        placeholder="Search..."
      />
      <button ><SearchIcon /></button>
      </div>
  </div>
  
</div>

  );
};

export default Navbar;
