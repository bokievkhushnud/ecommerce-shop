import React from 'react';
import {
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { addProductToCart } from '../../commercetools-api/addProductToCart';
import './ButtonAddToCart.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ButtonAddToCartProps {
  productId: string;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ productId }) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // addProductToCart('1111', productId);
    console.log(`Added product with ID ${productId} to cart`);
  };

  return (
    <button
      className="button-add-to-cart"
      onClick={(e) => handleAddToCartClick(e)}
    >
      <AddShoppingCartIcon
        className="icon-add-to-cart"
        onClick={(e) => handleAddToCartClick(e)}
      ></AddShoppingCartIcon>
    </button>
  );
};

export { ButtonAddToCart };
