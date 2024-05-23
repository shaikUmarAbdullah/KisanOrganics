import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import './recproducts.css';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const port = 4000;

const Recproducts = (props) => {
  console.log("props.cat:", props.cat);
    const { products } = useContext(ShopContext);
    const cat = props.cat === null ? undefined : props.cat;
  // Filter products based on the category
  const filteredProducts = cat !== undefined
  ? products.filter(item => item.category === props.cat)
  : null;


  const filteredsliccedProducts = filteredProducts.slice(0, 4);

  return (
    <div className='popular'>
      <h1>Recomended Products</h1>
      <div className="product-grid-p">
        {filteredsliccedProducts.map((item, i) => (
          <Link to={`/product/${item.id}`} key={item.id} className="product-link">
            <div key={item.id} className="product-card">
              <div className="product-image">
                <img src={`http://localhost:${port}/upload/images/${item.image}`} alt={item.name} />
              </div>
              <div className="product-details">
                <h4>{item.name}</h4>
                <div className="product-prices">
                  <div className="product-prices-left">
                    <span className="price new-price"><CurrencyRupeeIcon fontSize="small"/>{item.new_price}</span>
                    <span className="price old-price"><CurrencyRupeeIcon fontSize="small"/>{item.old_price}</span>
                  </div>
                  <div className="product-prices-right">
                    <button className="add-to-cart"><LocalMallIcon style={{ fontSize: 20 }}/></button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <button className="view-all">View All &gt;</button> */}
    </div>
  );
};

export default Recproducts;
