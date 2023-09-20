import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import {
  updateCartItemQuantity,
  removeCartItem,
} from '../../commercetools-api/updateCart';
import { adaptCartData } from '../../utils/helpers';
import { updateCartQuantity } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  cartId: string;
  lineItemId: string;
  name: string;
  imageUrl: string;
  discountedPrice?: number;
  originalPrice: number;
  quantity: number;
  onQuantityChange: (data?: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cartId,
  lineItemId,
  name,
  imageUrl,
  discountedPrice,
  originalPrice,
  quantity,
  onQuantityChange,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      setCurrentQuantity(newQuantity);
      const updatedData = await updateCartItemQuantity(
        cartId,
        lineItemId,
        newQuantity
      );
      dispatch(updateCartQuantity(updatedData.totalLineItemQuantity));
      onQuantityChange(adaptCartData(updatedData));
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
    setIsLoading(false);
  };

  const handleDeleteItem = async () => {
    setIsLoading(true);
    try {
      const updatedData = await removeCartItem(cartId, lineItemId);
      dispatch(updateCartQuantity(updatedData.totalLineItemQuantity));
      onQuantityChange(adaptCartData(updatedData));
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
    navigate('/categories');
    setIsLoading(false);
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: '8px', padding: '8px' }}>
      <CardMedia
        component="img"
        sx={{ width: 80, marginRight: '12px' }}
        image={imageUrl}
        alt={name}
      />
      <CardContent sx={{ flex: '1', padding: '8px' }}>
        <Typography
          variant="h6"
          noWrap
          sx={{ width: '75%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {name}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="8px"
        >
          {discountedPrice && discountedPrice !== originalPrice && (
            <Typography
              variant="body2"
              style={{ textDecoration: 'line-through', opacity: 0.6 }}
            >
              Original: ${originalPrice.toFixed(2)}
            </Typography>
          )}

          <Typography variant="body2">
            Price: $
            {discountedPrice
              ? discountedPrice.toFixed(2)
              : originalPrice.toFixed(2)}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleQuantityChange(currentQuantity - 1)}
              disabled={isLoading}
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
            <input
              type="number"
              value={currentQuantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              disabled={isLoading}
              style={{ width: '40px', textAlign: 'center' }}
            />
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleQuantityChange(currentQuantity + 1)}
              disabled={isLoading}
            >
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" marginLeft="12px">
              Total: $
              {discountedPrice
                ? (discountedPrice * currentQuantity).toFixed(2)
                : (originalPrice * currentQuantity).toFixed(2)}
            </Typography>
            <IconButton
              size="small"
              color="secondary"
              onClick={handleDeleteItem}
              disabled={isLoading}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
