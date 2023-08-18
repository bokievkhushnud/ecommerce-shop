import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  getAccessToken,
  isTokenExpired,
  loginUser,
} from '../../services/commercetools';
import { login } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    let token = localStorage.getItem('accessToken') || '';
    if (!token || isTokenExpired(token)) {
      getAccessToken()
        .then((retrievedToken) => {
          localStorage.setItem('accessToken', retrievedToken);
          return loginUser(username, password, retrievedToken);
        })
        .then((data) => {
          const user = data.customer;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(login(user));
          navigate('/');
        })
        .catch((error) => {
          setErrorMessage(error.message || 'An unexpected error occurred.');
        });
    } else {
      loginUser(username, password, token)
        .then((data) => {
          const user = data.customer;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(login(user));
          navigate('/');
        })
        .catch((error) => {
          setErrorMessage(error.message || 'An unexpected error occurred.');
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      {errorMessage && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleLogin} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Log In
        </Button>
        <div style={{ marginTop: '16px' }}>
          <MuiLink component={RouterLink} to="/register" variant="body2">
            Don't have an account? Register
          </MuiLink>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
