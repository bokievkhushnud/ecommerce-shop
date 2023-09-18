import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
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
          404: Page Not Found
        </Typography>
        <Typography variant="h5" paragraph>
          Oops! It looks like the page you're looking for doesn't exist.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" component={Link} to="/">
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
