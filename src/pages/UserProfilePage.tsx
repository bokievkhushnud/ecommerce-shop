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
  Modal,
  Box,
} from '@mui/material';
import { getUserFromStorage } from '../utils/auth';
import { User } from '../types';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { validateDOB, validateEmail, validateName } from '../utils/validators';
import { toast } from 'react-toastify';
import {
  updateCustomerProfile,
  deleteCustomerAddress,
} from '../commercetools-api/updateCustomerInfo';
import AddressForm, { Address } from '../components/specific/AddressForm'; // Make sure to import the AddressForm
import ConfirmationModal from '../components/specific/ConfirmModal'; // Make sure to import the ConfirmationModal
import PasswordChangeModal from '../components/specific/PasswordChangeModal';

export const UserProfilePage: React.FC = () => {
  const userData: User | null = getUserFromStorage();
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

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
      const actions = [
        { action: 'setFirstName', firstName: firstName },
        { action: 'setLastName', lastName: lastName },
        { action: 'changeEmail', email: email },
        { action: 'setDateOfBirth', dateOfBirth: dateOfBirth },
      ];

      updateCustomerProfile(actions)
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

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setCurrentAddress(null);
    setModalOpen(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    // Store the addressId and open the modal
    setAddressToDelete(addressId);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteCustomerAddress(addressToDelete || '')
      .then((updatedCustomer) => {
        // Update the user in the local storage
        localStorage.setItem(
          'user',
          JSON.stringify({ customer: updatedCustomer })
        );
        toast.success('Address deleted successfully!');
        setModalVisible(false);
        setAddressToDelete(null);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong');
      });
  };

  const handleCancelDelete = () => {
    // Just close the modal and clear the addressToDelete state
    setModalVisible(false);
    setAddressToDelete(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
      </div>

      {/* Personal Information */}
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">
            Personal Information
            {isEditingPersonalInfo ? (
              <IconButton onClick={handleSavePersonalInfo}>
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditingPersonalInfo(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Typography>
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
              <Button
                variant="outlined"
                onClick={() => setPasswordModalOpen(true)}
              >
                Change Password
              </Button>
              <PasswordChangeModal
                open={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

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
                      handleEditAddress({
                        ...address,
                        isBilling: isBillingAddress(address.id),
                        isShipping: isShippingAddress(address.id),
                        isDefaultBilling: isDefaultBilling(address.id),
                        isDefaultShipping: isDefaultShipping(address.id),
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleDeleteAddress(address.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </List>
              {index < userData?.addresses.length - 1 && <Divider />}
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '15px' }}
            onClick={handleAddNewAddress}
          >
            Add New Address
          </Button>

          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Box
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '80%',
                borderRadius: '8px',
              }}
              p={2}
            >
              <AddressForm
                initialAddress={currentAddress || undefined}
                onClose={() => {
                  setModalOpen(false);
                }}
              />
            </Box>
          </Modal>
          <ConfirmationModal
            isVisible={isModalVisible}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </CardContent>
      </Card>
    </Paper>
  );
};
