import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import { Typography, Box } from '@mui/material';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const port = 4000;

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, userID } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    console.log(product._id);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className='productD-container'>
            <div className="product-left">
                
                    <img src={`http://localhost:${port}/upload/images/${product.image}`} alt='' />
                    <img src={`http://localhost:${port}/upload/images/${product.image}`} alt='' />
                    <img src={`http://localhost:${port}/upload/images/${product.image}`} alt='' />
                    <img src={`http://localhost:${port}/upload/images/${product.image}`} alt='' />
                
            </div>
            <div className="product-rightD">
                <h1>{product.name}</h1>
                {/* <div className="product-right-star">
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_dull_icon} alt='' />
                    <p>(122)</p>
                </div> */}
                <div className="product-right-prices">
                    <div className="product-old"><CurrencyRupeeIcon fontSize="small"/>{product.old_price}</div>
                    <div className="product-new"><CurrencyRupeeIcon fontSize="small"/>{product.new_price}</div>
                </div>
                <div className={`product-des ${showFullDescription ? 'full' : 'limited'}`}>
                    {product.description}
                </div>
                <button className="show-more-btn" onClick={toggleDescription}>
                    {showFullDescription ? 'Show less' : 'Show more'}
                </button>
                <div className="product-quantity">
                    <h1>Select Quantity</h1>
                    <Box>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </Box>
                </div>
                
                <button className='cartD' onClick={() => { addToCart(product._id, quantity) }}>ADD TO CART</button>
            </div>
        </div>
    );
}

export default ProductDisplay;
