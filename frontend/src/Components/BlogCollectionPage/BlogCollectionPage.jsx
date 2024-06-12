import React, { useContext } from 'react';
import './BlogCollectionPage.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const BlogCollectionPage = () => {
    const {blogs} = useContext(ShopContext);
  return (
    <div className="blog-collection">
      {blogs.map((blog, index) => (
        <Link to={`/blogs/${blog._id}`}><div key={index} className="blog-entry">
          <div className="blog-text">
            <h2 className="blog-heading">{blog.name}</h2>
            <p className="blog-subheading">{blog.info}</p>
          </div>
          <div className="blog-image-container">
            <img src={`http://localhost:4000/upload/images/product_1.JPG`} alt="" className="blog-image" />
          </div>
        </div></Link>
      ))}
    </div>
  );
};

export default BlogCollectionPage;
