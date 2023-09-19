import React from 'react';
import './ButtonAddToCart.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addProductToCart } from '../../commercetools-api/updateCart';
import { getCart } from '../../commercetools-api/createCart';

interface ButtonAddToCartProps {
  productId: string;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ productId }) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    getCart().then((data) => {
      console.log(`Added product with ID ${productId} to cart ${data.id}`);
      addProductToCart(data.id, productId);
    });
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
