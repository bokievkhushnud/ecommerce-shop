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
import { deleteCart } from '../../commercetools-api/deleteCart';
import applyPromoCode from '../../commercetools-api/handlePromoCode';
import { updateCartQuantity } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

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
  const [promoCode, setPromoCode] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
      setCartData(null);
      dispatch(updateCartQuantity(0));
      handleCloseConfirmModal();
      toast.success('Cart cleared successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error clearing the cart:', error);
    }
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleApplyPromoCode = async () => {
    try {
      setIsLoading(true);
      const updatedCartData = await applyPromoCode(
        cartData.cartId,
        cartData.version,
        promoCode
      );
      setCartData(adaptCartData(updatedCartData));
      setIsLoading(false);
      toast.success('Promo code applied successfully!');
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to apply promo code: ' + error);
      console.error('Failed to apply promo code:', error);
    }
  };

  // Calculate original total amount
  let originalTotalAmount = cartData?.lineItems?.reduce(
    (acc: number, item: any) => acc + item.originalPrice * item.quantity,
    0
  );

  // Calculate discounted total amount
  let discountedTotalAmount = cartData?.lineItems?.reduce(
    (acc: number, item: any) =>
      acc + (item.discountedPrice || item.originalPrice) * item.quantity,
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
          width: '60%',
          maxWidth: '800px',
        },
      }}
    >
      <div
        role="presentation"
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
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
            cartData.lineItems.map((item: any, index: number) => (
              <CartItem
                key={index}
                cartId={cartData.cartId}
                lineItemId={item.lineItemId}
                name={item.name}
                imageUrl={item.imageUrl}
                discountedPrice={item.discountedPrice}
                originalPrice={item.originalPrice}
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
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #E0E0E0',
            backgroundColor: '#F5F5F5',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              borderTop: '1px solid #E0E0E0',
              borderBottom: '1px solid #E0E0E0',
              backgroundColor: '#F5F5F5',
            }}
          >
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter Promo Code"
              style={{ padding: '8px', flex: '1', marginRight: '8px' }}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleApplyPromoCode}
              disabled={!promoCode.trim()}
            >
              Apply
            </Button>
          </div>
          {discountedTotalAmount !== originalTotalAmount && (
            <Typography
              variant="body2"
              style={{
                textDecoration: 'line-through',
                opacity: 0.6,
                marginBottom: '8px',
              }}
            >
              Original Total: ${originalTotalAmount?.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="h6"
            style={{ fontWeight: 600, marginBottom: '20px' }}
          >
            Total: ${discountedTotalAmount?.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Proceed to Checkout
          </Button>
          {cartData?.lineItems?.length ? (
            <Button
              variant="text"
              color="error"
              fullWidth
              onClick={handleOpenConfirmModal}
              style={{ marginTop: '10px' }}
            >
              Clear Cart
            </Button>
          ) : null}
        </div>
      </div>
      <Dialog
        open={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Clear Cart'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to clear your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClearCart} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default CartDrawer;
