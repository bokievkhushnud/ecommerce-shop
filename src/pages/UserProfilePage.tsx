import React from 'react';
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
  Chip,
  Avatar,
  TextField,
  IconButton,
} from '@mui/material';
import { getUserFromStorage } from '../utils/auth';
import { User } from '../types';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { validateDOB, validateEmail, validateName } from '../utils/validators';
import { toast } from 'react-toastify';
import { updateCustomerProfile } from '../commercetools-api/updateCustomerInfo';
import AddressForm from '../components/specific/AddressForm';

export const UserProfilePage: React.FC = () => {
  const userData: User | null = getUserFromStorage();

  const initials = `${userData?.firstName.charAt(0)}${userData?.lastName.charAt(
    0
  )}`;

  const isDefaultShipping = (addressId: string) => {
    return userData?.defaultShippingAddressId === addressId;
  };

  const isDefaultBilling = (addressId: string) => {
    return userData?.defaultBillingAddressId === addressId;
  };

  const isShippingAddress = (addressId: string) => {
    return userData?.shippingAddressIds.includes(addressId);
  };

  const isBillingAddress = (addressId: string) => {
    return userData?.billingAddressIds.includes(addressId);
  };

  const [isEditingPersonalInfo, setEditingPersonalInfo] = useState(false);

  // States to track the current values in the editable fields
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [email, setEmail] = useState(userData?.email);
  const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  });

  const handleInputChange = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'firstName':
      case 'lastName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'dateOfBirth':
        error = validateDOB(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSavePersonalInfo = async () => {
    if (Object.values(errors).every((error) => !error)) {
      const customerId = userData?.id;
      const version = userData?.version;

      const actions = [
        { action: 'setFirstName', firstName: firstName },
        { action: 'setLastName', lastName: lastName },
        { action: 'changeEmail', email: email },
        { action: 'setDateOfBirth', dateOfBirth: dateOfBirth },
      ];

      updateCustomerProfile(customerId, version, actions)
        .then((updatedCustomer) => {
          // Update the user in the local storage
          localStorage.setItem(
            'user',
            JSON.stringify({ customer: updatedCustomer })
          );
          toast.success('Profile updated successfully!');
          setEditingPersonalInfo(false);
        })
        .catch((error) => {
          toast.error(error.message || 'Something went wrong');
        });
    } else {
      toast.error('Please fix the errors before saving');
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newData: User) => {
    handleClose();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <Avatar style={{ marginRight: '10px' }}>{initials}</Avatar>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
      </div>

      {/* Personal Information */}
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Personal Information</Typography>
          <List>
            <ListItem>
              {isEditingPersonalInfo ? (
                <>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      handleInputChange('firstName', e.target.value);
                    }}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </>
              ) : (
                <Typography variant="body1">First Name: {firstName}</Typography>
              )}
            </ListItem>

            <ListItem>
              {isEditingPersonalInfo ? (
                <>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      handleInputChange('lastName', e.target.value);
                    }}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </>
              ) : (
                <Typography variant="body1">Last Name: {lastName}</Typography>
              )}
            </ListItem>

            <ListItem>
              {isEditingPersonalInfo ? (
                <>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange('email', e.target.value);
                    }}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </>
              ) : (
                <Typography variant="body1">Email: {email}</Typography>
              )}
            </ListItem>

            <ListItem>
              {isEditingPersonalInfo ? (
                <>
                  <TextField
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      handleInputChange('dateOfBirth', e.target.value);
                    }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                  />
                </>
              ) : (
                <Typography variant="body1">
                  Date of Birth: {dateOfBirth}
                </Typography>
              )}
            </ListItem>

            <ListItem>
              {isEditingPersonalInfo ? (
                <IconButton onClick={handleSavePersonalInfo}>
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setEditingPersonalInfo(true)}>
                  <EditIcon />
                </IconButton>
              )}
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Shipping Addresses */}
      {/* Addresses */}
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Addresses</Typography>
          {userData?.addresses.map((address: any, index: number) => (
            <div key={index}>
              <List>
                <ListItem>
                  <Typography variant="body1">
                    {address.streetName}, {address.city}, {address.postalCode},{' '}
                    {address.country}
                  </Typography>

                  {/* Show Chip for Default Shipping */}
                  {isDefaultShipping(address.id) && (
                    <Chip
                      label="Default Shipping"
                      color="primary"
                      size="small"
                      style={{ marginLeft: '10px' }}
                    />
                  )}

                  {/* Show Chip for Default Billing */}
                  {isDefaultBilling(address.id) && (
                    <Chip
                      label="Default Billing"
                      color="primary"
                      size="small"
                      style={{ marginLeft: '10px' }}
                    />
                  )}

                  {/* Show Chip if address is a Shipping Address */}
                  {isShippingAddress(address.id) && (
                    <Chip
                      label="Shipping"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: '10px' }}
                    />
                  )}

                  {/* Show Chip if address is a Billing Address */}
                  {isBillingAddress(address.id) && (
                    <Chip
                      label="Billing"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: '10px' }}
                    />
                  )}

                  <IconButton
                    onClick={() => {
                      /* handleEditAddress function here */
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      /* handleDeleteAddress function here */
                    }}
                  >
                    {/* You can use a delete icon here */}
                  </IconButton>
                </ListItem>
              </List>
              {index < userData?.addresses.length - 1 && <Divider />}
            </div>
          ))}
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ marginTop: '15px' }}
          >
            Add New Address
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};
