import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Avatar,
} from '@mui/material';

const WelcomeBanner: React.FC = () => {
  return (
    <Box
      mt={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{
        margin: '0',
        backgroundImage: 'url(./basket.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '24vw',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          paragraph
          style={{ color: '#7a9626', margin: '6vw 0 0', fontWeight: 'bold' }}
        >
          Welcome to the food market
        </Typography>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
          Grandma's Basket
        </Typography>
        <Typography variant="subtitle1" paragraph style={{}}>
          We'll remind you of your grandma's cooking
        </Typography>
      </Container>
    </Box>
  );
};

export default WelcomeBanner;
