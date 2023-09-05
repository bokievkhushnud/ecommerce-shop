import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Address {
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

interface Props {
  initialAddress?: Address;
  onSubmit: (address: Address) => void;
}

const AddressForm: React.FC<Props> = ({ initialAddress, onSubmit }) => {
  const [address, setAddress] = useState<Address>(
    initialAddress || {
      country: '',
      city: '',
      street: '',
      postalCode: '',
    }
  );
  const [errors, setErrors] = useState<Partial<Address>>({});

  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialAddress]);

  const validateCity = (city: string): string => {
    return /^[a-zA-Z\s]+$/.test(city) ? '' : 'Invalid city name';
  };

  const validateStreet = (street: string): string => {
    return street.trim() === '' ? 'Street cannot be empty' : '';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddress((prev) => ({ ...prev, [name]: value }));

    let error = '';
    switch (name) {
      case 'street':
        error = validateStreet(value);
        break;
      case 'city':
        error = validateCity(value);
        break;
      case 'postalCode':
        error = validatePostalCodeForCountry(value, address.country);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setAddress((prevData) => ({ ...prevData, country: value }));

    const postalCodeError = validatePostalCodeForCountry(
      address.postalCode,
      value
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      postalCode: postalCodeError,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(errors).every((error) => !error)) {
      onSubmit(address);
    } else {
      console.error('Address form is invalid');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          name="country"
          value={address.country}
          onChange={handleCountryChange}
          label="Country"
        >
          <MenuItem value={'US'}>United States</MenuItem>
          <MenuItem value={'CA'}>Canada</MenuItem>
        </Select>
        {!!errors.country && (
          <Typography color="error">{errors.country}</Typography>
        )}
      </FormControl>

      <TextField
        name="city"
        label="City"
        value={address.city}
        onChange={handleInputChange}
        error={!!errors.city}
        helperText={errors.city}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        name="street"
        label="Street"
        value={address.street}
        onChange={handleInputChange}
        error={!!errors.street}
        helperText={errors.street}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        name="postalCode"
        label="Postal Code"
        value={address.postalCode}
        onChange={handleInputChange}
        error={!!errors.postalCode}
        helperText={errors.postalCode}
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default AddressForm;
