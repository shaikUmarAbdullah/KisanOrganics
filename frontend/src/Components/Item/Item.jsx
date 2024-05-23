import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Item.css';

const Item = (props) => {
  return (
    <Box className='item'>
      <div className="item-left">
        <img
          src={props.image}
        />
      </div>
      <div className="item-right">
        <div className="item-name">
          <Link to={`/Product/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{props.name}</h3>
          </Link>
        </div>
        <div className="item-price">
          <p className='old-price'><CurrencyRupeeIcon fontSize="small"/>{props.old_price}</p>
          <p className='new-price'><CurrencyRupeeIcon fontSize="small"/>{props.new_price}</p>
        </div>
        <button>Add To Cart</button>
      </div>
    </Box>
  );
};

export default Item;
