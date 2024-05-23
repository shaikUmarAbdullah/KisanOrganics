import React from 'react';
import { Link } from 'react-router-dom';
import {Grid} from '@mui/material';
import Item from '../Components/Item/Item'
import { useContext,useState } from 'react';
import { ShopContext } from '../Components/Context/ShopContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './CSS/Allproducts.css';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const port = 4000;

const AllProducts = () => {
  // const isMobile = useMediaQuery('(max-width:600px)');
  // const isTablet = useMediaQuery('(max-width:960px)');
  // const isDesktop = useMediaQuery('(min-width:960px)');
  const { products } = useContext(ShopContext);
  const { addToCart, userID } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div className='popular'>
      <h1>All Products</h1>
      {/* <hr /> */}
      <div className="product-grid">
        {products.map((item, i) => (
          
          <div key={item.id} className="product-card">
            <div className="product-image">
              <img src={`http://localhost:${port}/upload/images/${item.image}`} alt={item.name} />
            </div>
            <div className="product-details">
            <Link to={`/product/${item.id}`} key={item.id} className="product-link"> <h4>{item.name}</h4></Link>
              <div className="product-prices">
                <div className="product-prices-left">
                <span className="price new-price"><CurrencyRupeeIcon fontSize="small"/>{item.new_price}</span>
                <span className="price old-price"><CurrencyRupeeIcon fontSize="small"/>{item.old_price}</span>
                </div>
                <div className="product-prices-right">
                <button onClick={() => { addToCart(item._id, quantity) }} className="add-to-cart"><LocalMallIcon style={{ fontSize: 20 }}/></button></div>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
