import React from 'react';
import './CustomerCare.css';

const CustomerCare = () => {
  return (
    <div className="customer-care-container">
      <h2>Customer Care</h2>
      
      <div className="common-queries">
        <h3>Common Queries</h3>
        <ul>
          <li>How can I track my order?</li>
          <li>What is the return policy?</li>
          <li>How do I change my shipping address?</li>
          <li>How can I cancel my order?</li>
        </ul>
      </div>

      <div className="chat-option">
        <h3>Chat with Us</h3>
        <form>
          <textarea placeholder="Type your message here..." rows="4"></textarea>
          <button type="submit">Start Chat</button>
        </form>
      </div>

      <div className="call-option">
        <h3>Call Us</h3>
        <p>Need immediate assistance? Call us at:</p>
        <a href="tel:+18001234567">+1 800 123 4567</a>
      </div>
    </div>
  );
};

export default CustomerCare;
