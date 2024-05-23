import React from 'react'
import './Topcategory.css';
import category1 from '../Assets/Products/category1.png';
import category2 from '../Assets/Products/category2.png';
import category3 from '../Assets/Products/category3.png';
import category4 from '../Assets/Products/category4.png';

const Topcategory = () => {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <div className="category-container">
        <a href='/traps' className="category">
          <img src={category1} alt="Category 1" />
          <span>For Vegetables</span>
        </a>
        <a href='/mixingoil' className="category">
          <img src={category2} alt="Category 2" />
          <span>For Fruits</span>
        </a>
        <a href='/traps' className="category">
          <img src={category3} alt="Category 3" />
          <span>For Chilli</span>
        </a>
        <a href='neemoil' className="category">
          <img src={category4} alt="Category 4" />
          <span>Neem Oil</span>
        </a>
        {/* Add more categories as needed */}
      </div>
    </div>
  )
}

export default Topcategory