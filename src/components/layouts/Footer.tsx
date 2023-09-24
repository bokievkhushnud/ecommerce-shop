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
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#000',
      }}
    >
      <Grid container spacing={2}>
        <Grid sm={5}>
          <Typography variant="body1">Subscribe to our news-letters</Typography>
          <TextField
            id="email-subscribtion"
            label="Email"
            type="email"
            defaultValue="Enter your email"
            helperText="Enter email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              borderBlockColor: '#fff',
            }}
            endIcon={<SendIcon />}
          >
            Subscribe
          </Button>
        </Grid>
        <Grid sm={5}>
          <Typography variant="h4" sx={{ textAlign: 'right' }}>
            Contacts
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'right' }}>
            <Link underline="none" href="tel:+123456789">
              +123456789
            </Link>
            <Link underline="none" href="mailto:grandmasbasket@mail.com">
              grandmasbasket@mail.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
