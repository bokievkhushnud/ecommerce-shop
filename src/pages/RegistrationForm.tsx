import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  IconButton,
  FormControl,
  InputLabel,
  Container,
  Box,
  Divider,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { registerCustomer } from '../commercetools-api/registerService';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormData, FormErrors } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const RegistrationForm: React.FC = () => {
  const initialFormData: FormData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] =
    useState(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false);
  const [isAlsoBillingAddress, setIsAlsoBillingAddress] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validators
  const validateEmail = (email: string): string =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format';

  const validatePassword = (password: string): string =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
      password
    )
      ? ''
      : 'Password should be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 symbol';

  const validateName = (name: string): string =>
    /^[A-Za-z]+$/.test(name)
      ? ''
      : 'Only alphabets allowed and cannot be empty';

  const validateDOB = (dob: string): string => {
    const ageDiff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970) < 13
      ? 'You must be 13 years or older'
      : '';
  };
  const validateStreet = (street: string): string => {
    return street.trim() === '' ? 'Street cannot be empty' : '';
  };

  const validateCity = (city: string): string => {
    return /^[a-zA-Z\s]+$/.test(city) ? '' : 'Invalid city name';
  };

  const validatePostalCodeForCountry = (
    postalCode: string,
    country: string
  ): string => {
    if (country === 'US' && !/^\d{5}$/.test(postalCode)) {
      return 'Invalid US postal code format (e.g. 12345)';
    }
    if (
      country === 'CA' &&
      !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)
    ) {
      return 'Invalid Canada postal code format (e.g. A1B 2C3)';
    }
    return '';
  };

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, country: value }));

    const postalCodeError = validatePostalCodeForCountry(
      formData.postalCode,
      value
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: postalCodeError,
    }));
  };

  const handleBillingCountryChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, billingCountry: value }));
    const postalCodeError = validatePostalCodeForCountry(
      formData.postalCode,
      value
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      billingPostalCode: postalCodeError,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    let error = '';
    switch (name) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'firstName':
      case 'lastName':
        error = validateName(value);
        break;
      case 'dob':
        error = validateDOB(value);
        break;
      case 'street':
        error = validateStreet(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'postalCode':
        error = validatePostalCodeForCountry(value, formData.country);
        break;
      case 'billingStreet':
        error = validateStreet(value);
        break;
      case 'billingCity':
        error = validateCity(value);
        break;
      case 'billingPostalCode':
        try {
          error = validatePostalCodeForCountry(value, formData.billingCountry);
        } catch (e) {
          console.error(e);
        }
        break;

      default:
        break;
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const areFieldsFilled = (): boolean => {
    return !isAlsoBillingAddress
      ? Object.values(formData).every((field) => field !== '')
      : Object.values(formData)
          .slice(0, 8)
          .every((field) => field !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      Object.values(formErrors).every((error) => !error) &&
      areFieldsFilled()
    ) {
      registerCustomer(
        formData,
        isDefaultShippingAddress,
        isDefaultBillingAddress,
        isAlsoBillingAddress
      )
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response));
          dispatch(login(response));
          navigate('/');
          toast.success('Registration successful');
        })
        .catch((error) => {
          toast.error(error.message || 'Registration failed');
        });
    } else {
      console.error('Form is invalid');
      if (!areFieldsFilled()) {
        toast.error('Please fill in all fields');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          Enter your details below
        </Typography>
        <Card
          variant="outlined"
          style={{
            width: '100%',
            padding: '20px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Personal Information */}
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider />
            <Box mt={2}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                name="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                error={!!formErrors.dob}
                helperText={formErrors.dob}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Account Information */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Divider />
              <Box mt={2}>
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="password"
                  label="Password"
                  type={pwdVisible ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
              </Box>
            </Box>

            {/* Address */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Divider />
              <Box mt={2}>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    label="Country"
                  >
                    <MenuItem value={'US'}>United States</MenuItem>
                    <MenuItem value={'CA'}>Canada</MenuItem>
                  </Select>
                  {!!formErrors.country && (
                    <Typography color="error">{formErrors.country}</Typography>
                  )}
                </FormControl>

                <TextField
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name="street"
                  label="Street"
                  value={formData.street}
                  onChange={handleInputChange}
                  error={!!formErrors.street}
                  helperText={formErrors.street}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name="postalCode"
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  error={!!formErrors.postalCode}
                  helperText={formErrors.postalCode}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefaultShippingAddress}
                    onChange={(e) =>
                      setIsDefaultShippingAddress(e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Set as default shipping address"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAlsoBillingAddress}
                    onChange={(e) => setIsAlsoBillingAddress(e.target.checked)}
                    color="primary"
                  />
                }
                label="Also use this address as my billing address"
              />
            </Box>
            {!isAlsoBillingAddress && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Billing Address
                </Typography>
                <Divider />
                <Box mt={2}>
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      name="billingCountry"
                      value={formData.billingCountry}
                      onChange={handleBillingCountryChange}
                      label="Country"
                    >
                      <MenuItem value={'US'}>United States</MenuItem>
                      <MenuItem value={'CA'}>Canada</MenuItem>
                    </Select>
                    {!!formErrors.billingCountry && (
                      <Typography color="error">
                        {formErrors.billingCountry}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    name="billingCity"
                    label="City"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                    error={!!formErrors.billingCity}
                    helperText={formErrors.billingCity}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    name="billingStreet"
                    label="Street"
                    value={formData.billingStreet}
                    onChange={handleInputChange}
                    error={!!formErrors.billingStreet}
                    helperText={formErrors.billingStreet}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    name="billingPostalCode"
                    label="Postal Code"
                    value={formData.billingPostalCode}
                    onChange={handleInputChange}
                    error={!!formErrors.billingPostalCode}
                    helperText={formErrors.billingPostalCode}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDefaultBillingAddress}
                  onChange={(e) => setIsDefaultBillingAddress(e.target.checked)}
                  color="primary"
                />
              }
              label="Set as default billing address"
            />

            {/* Submit Button */}
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  !(
                    Object.values(formErrors)
                      .slice(0, 8)
                      .every((error) => !error) && areFieldsFilled()
                  )
                }
              >
                Register
              </Button>
            </Box>
          </form>
          <Typography style={{ marginTop: '20px' }}>
            Already have an account?&nbsp;
            <MuiLink component={Link} to="/login">
              Sign in here
            </MuiLink>
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
