import React, { useState } from 'react';
import {
  Button,
  TextField,
  Link as MuiLink,
  Container,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegistration = async (e: Event) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Step 1: Get an access token
      // const authURL = `https://${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}@auth.${process.env.REACT_APP_REGION}.commercetools.com/oauth/token`;
      const authURL =
        'https://PdGVmPTR01lHT-b2ATjQDFJ8:jAQqI_05SgOVeNBI_RA1L5czKHWnuCZA@auth.australia-southeast1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:eshop123';

      const tokenResponse = await axios.post(authURL, null, {
        headers: {
          'Content-Length': '0',
          Host: '<calculated when request is sent>',
        },
      });

      const accessToken = tokenResponse.data.access_token;
      console.log('Access token:', accessToken);

      // Step 2: Make the user registration API call using the access token
      const registrationResponse = await axios.post(
        'https://api.your-region.commercetools.com/your-project-key/customers',
        {
          email,
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (registrationResponse.status === 201) {
        console.log('Registration response:', registrationResponse.data);
        setSuccessMessage('Your account has been created successfully!');
      } else {
        // Handle any other responses accordingly
        alert('There was an error with the registration.');
      }
    } catch (error) {
      console.error(
        'There was an error during the registration process:',
        error
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Registration
      </Typography>
      <form>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={(e) => handleRegistration(e.nativeEvent)}
        >
          Register
        </Button>
        <div style={{ marginTop: '16px' }}>
          <MuiLink component={RouterLink} to="/login" variant="body2">
            Already have an account? Log In
          </MuiLink>
        </div>
      </form>
      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
        </Typography>
      )}
    </Container>
  );
};

export default RegistrationForm;
