import React from 'react';
import { Paper, Typography } from '@mui/material';

const DiscountBanner: React.FC = () => {
  return (
    <Paper style={{ padding: '10px', marginBottom: '20px' }}>
      <Typography variant="h6">Discount Offer!</Typography>
      <Typography>
        Use code <strong>SAVE20</strong> to get 20% off your first purchase.
      </Typography>
    </Paper>
  );
};

export default DiscountBanner;
