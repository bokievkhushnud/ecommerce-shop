import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { loginUser } from '../commercetools-api/loginService';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const EMAIL_REGEX: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>(
    'Please enter your email'
  );
  const [pwd, setPwd] = useState<string>('');
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [pwdError, setPwdError] = useState<string[]>([
    'Please enter your password',
  ]);
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const [emailAndPwdValid, setEmailAndPwdValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailError || pwdError.length > 0) {
      setEmailAndPwdValid(false);
    } else {
      setEmailAndPwdValid(true);
    }
  }, [emailError, pwdError]);

  const emailHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setEmail(e.target.value);
    if (!EMAIL_REGEX.test(e.target.value)) {
      setEmailError('The email is not valid');
    } else {
      setEmailError('');
    }
    inputBlurHandler(e.target.name);
  };

  const pwdValidation = (password: string): string[] => {
    const errors = [];

    if (password.length < 8) errors.push('Must contain at least 8 characters');
    if (!/[a-z]/.test(password))
      errors.push('Must contain at least one lowercase letter');
    if (!/[A-Z]/.test(password))
      errors.push('Must contain at least one uppercase letter');
    if (!/\d/.test(password)) errors.push('Must contain at least one number');
    if (!/[@$!%*?&]/.test(password))
      errors.push(
        'Must contain at least one special character (e.g., !@#$%^&*)'
      );
    if (/\s/.test(password)) errors.push('Must not contain whitespaces');

    return errors;
  };
  const pwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPwd(e.target.value);
    const pwdErrors = pwdValidation(e.target.value);
    if (pwdErrors.length) {
      setPwdError(pwdErrors);
    } else {
      setPwdError([]);
    }
    inputBlurHandler(e.target.name);
  };
  const inputBlurHandler = (name: string) => {
    switch (name) {
      case 'email':
        setEmailFocus(true);
        break;
      case 'password':
        setPwdFocus(true);
        break;
    }
  };

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, pwd)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(login(data));
        navigate('/');
      })
      .catch(() => {
        toast.error('Invalid email or password');
      });
  };

  const handleRedirect = (e: React.MouseEvent) => {
    navigate('/registration');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <ToastContainer />
      <Card variant="outlined" style={{ minWidth: 300, padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Log in
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              id="userEmail"
              name="email"
              label="Your email"
              type="email"
              value={email}
              error={emailFocus && !!emailError}
              helperText={emailFocus && emailError}
              onChange={emailHandler}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              id="userPassword"
              name="password"
              label="Password"
              type={pwdVisible ? 'text' : 'password'}
              value={pwd}
              error={pwdError.length > 0 && pwdFocus}
              onChange={pwdHandler}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setPwdVisible(!pwdVisible)}>
                    {pwdVisible ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
            {pwdError.length > 0 && (
              <div
                style={{
                  color: 'red',
                  marginLeft: 14,
                  marginTop: 4,
                  fontSize: 12,
                }}
              >
                <ul>
                  {pwdError.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              disabled={!emailAndPwdValid}
              type="submit"
              onClick={loginHandler}
            >
              Log in
            </Button>
          </form>
          <Typography style={{ marginTop: '20px' }}>
            Have not registered yet?&nbsp;
            <MuiLink
              component={Link}
              to="/registration"
              onClick={handleRedirect}
            >
              Register here
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
