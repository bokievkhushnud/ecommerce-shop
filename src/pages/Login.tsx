import { useEffect, useState } from 'react';
import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { loginUser } from '../commercetools-api/login-service';

const EMAIL_REGEX: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>(
    'Please enter your email'
  );
  const [pwd, setPwd] = useState<string>('');
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [pwdError, setPwdError] = useState<string>(
    'Please enter your password'
  );
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const [emailAndPwdValid, setEmailAndPwdValid] = useState<boolean>(false);
  const [loginValid, setLoginValid] = useState<boolean>(true);

  useEffect(() => {
    if (emailError || pwdError) {
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
  };

  const pwdHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPwd(e.target.value);
    if (!PWD_REGEX.test(e.target.value)) {
      setPwdError(
        'Yor password must contain at least 8 characters, at at least one uppercase and one lowercase letter, at least one special character (e.g., !@#$%^&*) and must not contain whitespaces'
      );
    } else {
      setPwdError('');
    }
  };

  const inputBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ): void => {
    switch (e.target.name) {
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

    // const anonymousCartData = {
    //     id: '{{cart-id}}',
    //     typeId: 'cart',
    // };
    loginUser(email, pwd)
      .then((data) => {
        setLoginValid(true);
        console.log(data);
        //check with registered user
        //add router link here
      })
      .catch(() => {
        setLoginValid(false);
      });
  };

  return (
    <div>
      <h1>Log in</h1>
      {!loginValid && (
        <div className="">
          <ErrorOutlineOutlinedIcon style={{ color: 'red' }} />
          <span style={{ color: 'red' }}>Invalid email or password</span>
        </div>
      )}
      <form>
        <label htmlFor="userEmail">Your email:</label>
        <Input
          value={email}
          onBlur={(e) => inputBlurHandler(e)}
          onChange={(e) => emailHandler(e)}
          type="text"
          id="userEmail"
          name="email"
        />
        {emailFocus && emailError && (
          <p id="emailErrorNote" className="" style={{ color: 'red' }}>
            {emailError}
          </p>
        )}
        <label htmlFor="userPassword">Password:</label>
        <Input
          value={pwd}
          onBlur={(e) => inputBlurHandler(e)}
          onChange={(e) => pwdHandler(e)}
          type={pwdVisible ? 'text' : 'password'}
          id="userPassword"
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={(): void => setPwdVisible(!pwdVisible)}>
                {pwdVisible ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        {pwdFocus && pwdError && (
          <p id="pwdErrorNote" className="" style={{ color: 'red' }}>
            {pwdError}
          </p>
        )}
      </form>
      <button
        disabled={!emailAndPwdValid}
        type="submit"
        onClick={(e) => loginHandler(e)}
      >
        Log in
      </button>
      <p>
        Have not registered yet?<span> Sign up </span>
        <span className="line">
          {/*add router link here*/}
          <a href="https://mail.google.com/">here</a>
        </span>
      </p>
    </div>
  );
};

export default Login;
