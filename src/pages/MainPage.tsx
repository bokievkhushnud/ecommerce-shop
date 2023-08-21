import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import SearchAndFilter from '../components/common/SearchAndFilter';
import DiscountBanner from '../components/common/DiscountBanner';
import ProductCard from '../components/common/ProductCard';

const MainPage: React.FC = () => {
  // This data will be fetched from API
  const products = [
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
    {
      title: 'Sample Product 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a sample product.',
      price: 29.99,
    },
  ];

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginY={4}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Grandma's Shop
        </Typography>
        <Typography variant="h5" paragraph>
          We'll remind you of your grandma's cooking.
        </Typography>
      </Box>

      <SearchAndFilter />

      <DiscountBanner />

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage;
