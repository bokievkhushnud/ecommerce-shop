import React from 'react';
import { useState, useEffect } from 'react';
import './ButtonAddToCart.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addProductToCart } from '../../commercetools-api/updateCart';
import { getCart } from '../../commercetools-api/createCart';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity } from '../../store/cartSlice';
import { RootState } from '../../store';

interface ButtonAddToCartProps {
  productId: string;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ productId }) => {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const dispatch = useDispatch();
  const itemsQuantity = useSelector(
    (state: RootState) => state.cart.itemsQuantity
  );

  useEffect(() => {
    getCart().then((data) => {
      const { lineItems } = data;
      const productInCart = lineItems.find(
        (item: any) => item.productId === productId
      );
      console.log(productInCart);
      if (productInCart) {
        setIsProductInCart(true);
      }
    });
  }, [productId, itemsQuantity]);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO if user logedout - 404
    setIsProductInCart(true);
    getCart().then((data) => {
      toast.success(`Product added to cart`);
      addProductToCart(data.id, productId)
        .then((data) => {
          console.log(data);
          dispatch(updateCartQuantity(data.totalLineItemQuantity));
        })
        .catch((error) => {
          toast.error('Error adding product to cart:', error);
          setIsProductInCart(false);
        });
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
      disabled={itemsQuantity > 0 && isProductInCart}
    >
      <AddShoppingCartIcon
        className="icon-add-to-cart"
        onClick={(e) => handleAddToCartClick(e)}
      ></AddShoppingCartIcon>
    </button>
  );
};

export { ButtonAddToCart };
