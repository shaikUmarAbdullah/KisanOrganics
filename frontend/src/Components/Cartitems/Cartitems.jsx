import React, { useContext } from 'react';
import './Cartitems.css';
import { ShopContext } from '../Context/ShopContext';

const port=4000;

const Cartitems = ({ item }) => {
  const { removeFromCart } = useContext(ShopContext);

  const handleRemove = () => {
    removeFromCart(item.product_id._id);
  };

  return (
    <div className="cart-item">
      <img src={`http://localhost:${port}/upload/images/${item.product_id.image}`} alt={item.product_id.name} />
      <div className="item-details">
        <h3>{item.product_id.name}</h3>
        <p>Price: {item.product_id.new_price}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Cartitems;
