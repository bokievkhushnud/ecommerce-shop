import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CartItem from './CartItem';
import { useState, useEffect } from 'react';
import { fetchCartByUserId } from '../../commercetools-api/fetchCart';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { adaptCartData } from '../../utils/helpers';
import { getCart } from '../../commercetools-api/createCart';
import { deleteCart } from '../../commercetools-api/delteCart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  customerID?: string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  customerID,
}) => {
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setIsLoading(true);

      getCart()
        .then(() => {
          return fetchCartByUserId(customerID || '');
        })
        .then((data) => {
          const adaptedData = adaptCartData(data);
          setCartData(adaptedData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          setIsLoading(false);
        });
    }
  }, [open, customerID]);

  const handleClearCart = async () => {
    try {
      await deleteCart(cartData.cartId, cartData.version);
      setCartData(null); // Clear the local cart state
    } catch (error) {
      console.error('Error clearing the cart:', error);
    }
  };

  let totalAmount = cartData?.lineItems?.reduce(
    (acc: number, item: any) => acc + item.individualPrice * item.quantity,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: '40%',
        maxWidth: '400px',
        '@media (min-width: 900px)': {
          // This applies for screens wider than 900px (around the md breakpoint)
          width: '60%',
          maxWidth: '800px',
        },
      }}
    >
      <div
        role="presentation"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {/* Cart Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            borderBottom: '1px solid #E0E0E0',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Cart
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Cart Items */}
        <List>
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
              }}
            >
              <CircularProgress />
            </div>
          ) : cartData?.lineItems?.length > 0 ? (
            cartData.lineItems?.map((item: any, index: number) => (
              <CartItem
                key={index}
                cartId={cartData.cartId}
                lineItemId={item.lineItemId}
                name={item.name}
                imageUrl={item.imageUrl}
                individualPrice={item.individualPrice}
                quantity={item.quantity}
                onQuantityChange={setCartData}
              />
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
              }}
            >
              <Typography variant="body1">Your cart is empty.</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  onClose();
                  navigate('/categories');
                }}
              >
                Browse Catalog
              </Button>
            </div>
          )}
        </List>

        {/* Cart Footer */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #E0E0E0',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: 600, marginBottom: '20px' }}
          >
            Total: ${totalAmount?.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Proceed to Checkout
          </Button>
          {cartData?.lineItems.length ? (
            <Button
              variant="text"
              color="error"
              fullWidth
              onClick={handleClearCart}
              style={{ marginTop: '10px' }}
            >
              Clear Cart
            </Button>
          ) : null}
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
