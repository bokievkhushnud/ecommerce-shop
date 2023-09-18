import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react';
import { updateCartItemQuantity } from '../../commercetools-api/updateCart';
import { adaptCartData } from '../../utils/helpers';

interface CartItemProps {
  cartId: string;
  lineItemId: string;
  name: string;
  imageUrl: string;
  individualPrice: number;
  quantity: number;
  onQuantityChange: (data?: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cartId,
  lineItemId,
  name,
  imageUrl,
  individualPrice,
  quantity,
  onQuantityChange,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      setCurrentQuantity(newQuantity);
      let updatedData = await updateCartItemQuantity(
        cartId,
        lineItemId,
        newQuantity
      );
      onQuantityChange(adaptCartData(updatedData));
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
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
          <Typography variant="body2">
            Price: ${individualPrice.toFixed(2)}
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
              Total: ${(individualPrice * currentQuantity).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;
