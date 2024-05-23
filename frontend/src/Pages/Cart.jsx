import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Components/Context/ShopContext';
import Cartitems from '../Components/Cartitems/Cartitems';
import Checkout from '../Components/Checkout/Checkout';

const Cart = () => {
  const { cart,products } = useContext(ShopContext);

  if (cart === null) {
    console.log(cart);
  console.log(products);
    return <p>Loading cart...</p>;
    
  }

  console.log(cart);
  

  return (
    <div>
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <Cartitems key={item._id} item={item} />
      ))}
      </div>
      <div className="checkout">
        <Checkout/>
      </div>
    
    </div>
  );
};

export default Cart;
