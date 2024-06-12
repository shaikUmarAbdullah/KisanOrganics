import React, { useContext } from 'react'
import './BlogList.css'
import bg from '../Assets/bg.jpg'
import bg1 from '../Assets/bg1.jpg'
import bg2 from '../Assets/bg2.jpg'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const {blogs} = useContext(ShopContext);
    if (!blogs) {
        return <div>No blog available</div>;}
        return (
            <div>
                <h1 className="blog-title">Latest News</h1>
                <div className="blog-container">
                    <div className="blog-header"></div>
                    <div className="blog-posts">
                        {blogs.map((blog, index) => (
                            <div className="blog-post" key={blog._id || index}>
                                <img
                                    src={blog.coverPic}
                                    alt="Blog"
                                    className="blog-post-image"
                                />
                                {/* <div className="blog-post-info">
                                    <span className="blog-post-date">{new Date(blog.date).toLocaleDateString()}</span>
                                    <span className="blog-post-category">{blog.category}</span>
                                    <span className="blog-post-author">By {blog.author}</span>
                                    <span className="blog-post-comments">{blog.comments} Comments</span>
                                </div> */}
                                <h2 className="blog-post-title">{blog.name}</h2>
                                <Link to={`/blogs/${blog._id}`}><button className="blog-post-button">Read More</button></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}

export default BlogList