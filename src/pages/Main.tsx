import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Our App
        </Typography>
        <Typography variant="h5" paragraph>
          Your one-stop solution for XYZ services.
        </Typography>
      </Box>
    </Container>
  );
};

export default MainPage;
