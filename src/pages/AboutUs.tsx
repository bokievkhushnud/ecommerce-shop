import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Box, Container, Typography, Avatar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import BgImage from '../assets/images/jacopo-maia--gOUx23DNks-unsplash.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
      light: '#ffffff9f',
      contrastText: '#fff',
    },
  },
});

const AboutUs = () => {
  return (
    <>
      <Container
        component="section"
        sx={{
          margin: 0,
          padding: 0,
          width: 1,
          height: 1,
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: 1,
              height: 500,
              backgroundColor: 'primary.main',
              backgroundImage: { BgImage },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                backgroundColor: 'primary.light',
                border: 'solid 5px #000',
                borderRadius: '10px',
                padding: '1rem',
              }}
            >
              ABOUT US
            </Typography>
          </Box>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default AboutUs;
