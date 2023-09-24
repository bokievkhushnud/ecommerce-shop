import React from 'react';
import {
  Box,
  Typography,
  Link,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: 'solid 3px #000',
      }}
    >
      <Grid container spacing={2} sx={{ padding: '15px' }}>
        <Grid sm={12} md={6} sx={{ padding: '15px' }}>
          <Typography variant="h4">Subscribe to our news-letters</Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="email-subscribtion"
              label="Email"
              type="email"
              defaultValue="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={() => {
                alert('Thank you! You have been subscribed.');
              }}
              variant="outlined"
              endIcon={<SendIcon />}
              sx={{ padding: '10px 0' }}
            >
              Subscribe
            </Button>
          </div>
        </Grid>
        <Grid sm={12} md={6} sx={{ padding: '0px' }}>
          <Typography variant="h4" sx={{ textAlign: 'right' }}>
            Contacts
          </Typography>
          <Typography variant="body1">
            <Link
              underline="none"
              href="tel:+123456789"
              sx={{ display: 'block', padding: '15px 0', textAlign: 'right' }}
            >
              +123456789
            </Link>
            <Link
              underline="none"
              href="mailto:grandmasbasket@mail.com"
              sx={{ display: 'block', padding: '15px 0', textAlign: 'right' }}
            >
              grandmasbasket@mail.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
