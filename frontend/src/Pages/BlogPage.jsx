import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Components/Context/ShopContext';
import BlogDisplay from '../Components/BlogDisplay/BlogDisplay';
import BlogList from '../Components/BlogList/BlogList';

const BlogPage = () => {
  const { blogs } = useContext(ShopContext);
  const { BlogId } = useParams();
  // console.log("All Products:", products);

  console.log('productID', BlogId);
  console.log(blogs);
  // Check if allProducts is still loading
  if (!blogs) {
    return <p>Loading...</p>;
  }

  // Find the product with the specified productId
  const blog = blogs.find((blog) => blog._id === BlogId);

  // Check if the product exists
  if (!blog) {
    return <p>Product not found</p>;
  }

  // Render the ProductDisplay component with the found product
  return (
  <>
    <BlogDisplay blog={blog} />;
  </>
  )
};
export default BlogPage