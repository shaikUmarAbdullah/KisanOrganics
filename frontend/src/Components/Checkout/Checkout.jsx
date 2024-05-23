import React, { useContext } from 'react';
import './Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Checkout = () => {
  const { cart } = useContext(ShopContext);

  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart.items)) {
      return 0;
    }
    return cart.items.reduce((acc, item) => acc + item.product_id.new_price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Proceeding to checkout');
  };

  return (
    <div className="checkout-container">
      {(!cart || cart.items.length === 0) ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="checkout-header">
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
              <span>Price</span>
            </div>
            <div className="header-block">
              <span>Quantity</span>
            </div>
            <div className="header-block">
              <span>Subtotal</span>
            </div>
          </div>
          <div className="checkout-items">
            {cart.items.map(item => (
              <div key={item.product_id._id} className="checkout-item">
                <div className="checkout-item-details">
                  <span>{item.product_id.name}</span>
                  <span className="price-container"><CurrencyRupeeIcon/>{item.product_id.new_price}</span>
                  <span>{item.quantity}</span>
                  <span className="price-container"><CurrencyRupeeIcon/>{(item.product_id.new_price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
          <h3 className="total-container">
              Total: <CurrencyRupeeIcon />{calculateTotal().toFixed(2)}
            </h3>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
