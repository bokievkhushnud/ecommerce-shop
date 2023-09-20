import React from 'react';
import { useState, useEffect } from 'react';
import './ButtonAddToCart.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addProductToCart } from '../../commercetools-api/updateCart';
import { getCart } from '../../commercetools-api/createCart';

interface ButtonAddToCartProps {
  productId: string;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ productId }) => {
  const [isProductInCart, setIsProductInCart] = useState(false);

  // TODO when user goes to other categories button becomes active again
  // useEffect(() => {
  //   console.log('check product in cart')
  //   getCart().then((data) => {
  //     if (
  //       data.lineItems.some((product: { id: string }) => {
  //         console.log(product.id, productId);
  //         product.id === productId;
  //       })
  //     ) {
  //       console.log('true');
  //       setIsProductInCart(true);
  //     }
  //   });
  // }, [productId]);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO if user logedout - 404
    getCart().then((data) => {
      console.log(data);
      console.log(`Added product with ID ${productId} to cart ${data.id}`);
      addProductToCart(data.id, productId);
      setIsProductInCart(true);
    });
  };

  return (
    <button
      className={`button-add-to-cart${isProductInCart ? ' inactive' : ''}`}
      title={
        isProductInCart
          ? 'Product already in your cart'
          : 'Add product to your cart'
      }
      onClick={(e) => handleAddToCartClick(e)}
      disabled={isProductInCart}
    >
      <AddShoppingCartIcon
        className="icon-add-to-cart"
        onClick={(e) => handleAddToCartClick(e)}
      ></AddShoppingCartIcon>
    </button>
  );
};

export { ButtonAddToCart };
