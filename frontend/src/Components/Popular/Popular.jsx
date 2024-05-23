import React from 'react';
import './Popular.css';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useContext,useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const port = 4000;

const Popular = () => {
  const { products } = useContext(ShopContext);
  const { addToCart, userID } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  

  // Take only the first 4 items from the products array
  const firstFourProducts = products.slice(0, 4);

  return (
    <div className="popular">
      <h1>Popular Products</h1>
      <div className="product-grid-p">
        {firstFourProducts.map((item, i) => (
          
            <div className="product-card">
              <div className="product-image">
                <img src={`http://localhost:${port}/upload/images/${item.image}`} alt={item.name} />
              </div>
              <div className="product-details">
              <Link to={`/product/${item.id}`} key={item.id} className="product-link">
                <h4>{item.name}</h4></Link>
                <div className="product-prices">
                  <div className="product-prices-left">
                    <span className="price old-price"><CurrencyRupeeIcon fontSize="small"/>{item.old_price}</span>
                    <span className="price new-price"><CurrencyRupeeIcon fontSize="small"/>{item.new_price}</span>
                  </div>
                  
                  <div className="product-prices-right">
                    <button onClick={() => { addToCart(item._id, quantity) }} className="add-to-cart"><LocalMallIcon style={{ fontSize: 20 }} /></button>
                  </div>
                </div>
              </div>
            </div>
          
        ))}
      </div>
    </div>

  );
};

export default Popular;
