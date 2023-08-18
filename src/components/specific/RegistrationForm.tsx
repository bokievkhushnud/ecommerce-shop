import React, { useState } from 'react';
import {
  Button,
  TextField,
  Link as MuiLink,
  Container,
  Typography,
} from '@mui/material';
import {
  getAccessToken,
  isTokenExpired,
  registerCustomer,
} from '../../services/commercetools';
import { Link as RouterLink } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRegistration = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    let token = localStorage.getItem('accessToken') || '';
    if (!token || isTokenExpired(token)) {
      getAccessToken()
        .then((retrievedToken) => {
          localStorage.setItem('accessToken', retrievedToken);
          return registerCustomer(
            email,
            firstName,
            lastName,
            password,
            retrievedToken
          );
        })
        .then((data) => {
          setSuccessMessage('Registration successful!');
        })
        .catch((error) => {
          setErrorMessage(error.message || 'An unexpected error occurred.');
        });
    } else {
      registerCustomer(email, firstName, lastName, password, token)
        .then((data) => {
          setSuccessMessage('Registration successful!');
        })
        .catch((error) => {
          setErrorMessage(error.message || 'An unexpected error occurred.');
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Registration
      </Typography>
      {errorMessage && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
        </Typography>
      )}
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
          onClick={(e) => handleRegistration(e)}
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
