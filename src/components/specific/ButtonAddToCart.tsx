import React from 'react';
import { useState, useEffect } from 'react';
import './ButtonAddToCart.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { addProductToCart } from '../../commercetools-api/updateCart';
import { getCart } from '../../commercetools-api/createCart';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity } from '../../store/cartSlice';
import { RootState } from '../../store';
import { removeCartItem } from '../../commercetools-api/updateCart';

interface ButtonAddToCartProps {
  productId: string;
  deleteBtn?: string;
}

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({
  productId,
  deleteBtn,
}) => {
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
      if (productInCart) {
        setIsProductInCart(true);
      }
    });
  }, [productId, itemsQuantity]);

  const handleDeleteItem = async () => {
    getCart().then((data) => {
      // get line item id from cart by prdocut id
      const { lineItems } = data;
      const productInCart = lineItems.find(
        (item: any) => item.productId === productId
      );
      const lineItemId = productInCart.id;
      removeCartItem(data.id, lineItemId)
        .then((data) => {
          dispatch(updateCartQuantity(data.totalLineItemQuantity));
          toast.success(`Product deleted from cart`);
          setIsProductInCart(false);
        })
        .catch((error) => {
          toast.error('Error deleting product from cart:', error);
        });
    });
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  if (deleteBtn === 'deleteBtn' && isProductInCart) {
    return (
      <IconButton size="small" color="secondary" onClick={handleDeleteItem}>
        Remove from cart
        <DeleteIcon fontSize="large" />
      </IconButton>
    );
  }

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
