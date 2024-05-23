import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);
axios.defaults.baseURL = "http://localhost:4000";

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [userId, setUserId] = useState('');
  const [preResult, setPreResult] = useState(null);
  const [userdetails, setuserdetails] = useState(null);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/allproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    const token = localStorage.getItem('auth-token');
    if (token) {
      fetchCart();
    }
  }, []);
  
  
  
  useEffect(() => {
    // Fetch cart data whenever userId changes
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const setUserIdAndUpdateCart = (id) => {
    setUserId(id);
  };

  const fetchCart = async () => {
    console.log("Fetching cart..."); // Add log to see if this function is called
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        console.error("No auth-token found in localStorage.");
        return;
      }
      const response = await axios.get("/fetch", {
        headers: {
          'auth-token': token
        }
      });
      console.log("Cart fetched:", response.data.cart); // Log the fetched cart
      setCart(response.data.cart ||  { items: [] });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post("/add", { product_id: productId, quantity }, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post("/remove", { product_id: productId }, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      await axios.post("/update", { product_id: productId, quantity }, {
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  // Additional log to check cart and products state
  useEffect(() => {
    console.log("Cart state:", cart);
    console.log("Products state:", products);
  }, [cart, products]);

  // Pass userId to children components through context
  const contextValue = { products, addToCart, removeFromCart, updateCartItemQuantity, cart, userId, setUserIdAndUpdateCart, setPreResult, preResult };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
