// Product.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/Product.css'
import { ShopContext } from '../Components/Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { products } = useContext(ShopContext);
  const { productId } = useParams();
  // console.log("All Products:", products);

  console.log('productID', productId);
  console.log(products);
  // Check if allProducts is still loading
  if (!products) {
    return <p>Loading...</p>;
  }

  // Find the product with the specified productId
  const product = products.find((product) => product.id === Number(productId));

  // Check if the product exists
  if (!product) {
    return <p>Product not found</p>;
  }

  // Render the ProductDisplay component with the found product
  return <ProductDisplay product={product} />;
};

export default Product;
