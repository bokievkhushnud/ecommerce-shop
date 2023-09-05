import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  validateCity,
  validatePostalCodeForCountry,
  validateStreet,
} from '../../utils/validators';
import { toast } from 'react-toastify';
import {
  addCustomerAddress,
  updateCustomerAddress,
} from '../../commercetools-api/updateCustomerInfo';

export interface Address {
  id?: string;
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

interface Props {
  initialAddress?: Address;
  onClose: () => void; // Function to close the modal
}

const AddressForm: React.FC<Props> = ({ initialAddress, onClose }) => {
  const [address, setAddress] = useState<Address>(
    initialAddress || {
      country: '',
      city: '',
      streetName: '',
      postalCode: '',
      isBilling: false,
      isShipping: false,
      isDefaultBilling: false,
      isDefaultShipping: false,
    }
  );

  const [errors, setErrors] = useState<Partial<Address>>({});

  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddress((prev) => ({ ...prev, [name]: value }));

    let error = '';
    switch (name) {
      case 'streetName':
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
    if (Object.values(errors).every((error) => !error) && address.country) {
      if (initialAddress) {
        console.log(address);
        updateCustomerAddress(
          initialAddress.id as string,
          {
            country: address.country,
            city: address.city,
            streetName: address.streetName,
            postalCode: address.postalCode,
          },
          address.isBilling,
          address.isDefaultBilling,
          address.isShipping,
          address.isDefaultShipping
        )
          .then((response) => {
            localStorage.setItem(
              'user',
              JSON.stringify({ customer: response })
            );
            toast.success('Address saved');
            onClose();
          })
          .catch((error) => {
            toast.error('Error saving address');
            console.error(error);
          });
      } else {
        addCustomerAddress(
          {
            country: address.country,
            city: address.city,
            streetName: address.streetName,
            postalCode: address.postalCode,
          },
          address.isBilling,
          address.isDefaultBilling,
          address.isShipping,
          address.isDefaultShipping
        )
          .then((response) => {
            localStorage.setItem(
              'user',
              JSON.stringify({ customer: response })
            );
            toast.success('Address saved');
            onClose();
          })
          .catch((error) => {
            toast.error('Error saving address');
            console.error(error);
          });
      }
    } else {
      toast.error('Address form is invalid');
    }
  };

  console.log(address);

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
        name="streetName"
        label="Street"
        value={address.streetName}
        onChange={handleInputChange}
        error={!!errors.streetName}
        helperText={errors.streetName}
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
      <FormControlLabel
        control={
          <Checkbox
            checked={address.isBilling}
            onChange={(e) =>
              setAddress({ ...address, isBilling: e.target.checked })
            }
            name="isBilling"
          />
        }
        label="Billing Address"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={address.isShipping}
            onChange={(e) =>
              setAddress({ ...address, isShipping: e.target.checked })
            }
            name="isShipping"
          />
        }
        label="Shipping Address"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={address.isDefaultBilling}
            onChange={(e) =>
              setAddress({ ...address, isDefaultBilling: e.target.checked })
            }
            name="isDefaultBilling"
          />
        }
        label="Default Billing Address"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={address.isDefaultShipping}
            onChange={(e) =>
              setAddress({ ...address, isDefaultShipping: e.target.checked })
            }
            name="isDefaultShipping"
          />
        }
        label="Default Shipping Address"
      />
      <Box mt={2}>
        {' '}
        {/* Add a top margin for visual spacing */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {initialAddress ? 'Update' : 'Add'}{' '}
          {/* Set button text based on initialAddress */}
        </Button>
      </Box>
    </Box>
  );
};

export default AddressForm;
