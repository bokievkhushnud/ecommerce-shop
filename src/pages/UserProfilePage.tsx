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
  Modal,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleEditMode } from '../store/userProfileSlice';
import { getUserFromStorage } from '../utils/auth';
import { User } from '../types';
import { useState } from 'react';
import UserProfileEdit from './UserProfileEdit';

export const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch();

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
              <Typography variant="body1">
                First Name: {userData?.firstName}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Last Name: {userData?.lastName}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                Date of Birth: {userData?.dateOfBirth}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">Email: {userData?.email}</Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Shipping Addresses */}
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Shipping Addresses</Typography>
          {userData?.addresses.map(
            (address: any, index: number) =>
              isShippingAddress(address.id) && (
                <div key={index}>
                  <List>
                    <ListItem>
                      <Typography variant="body1">
                        {address.streetName}, {address.city},{' '}
                        {address.postalCode}, {address.country}
                      </Typography>
                      {isDefaultShipping(address.id) && (
                        <Chip
                          label="Default Shipping"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '10px' }}
                        />
                      )}
                    </ListItem>
                  </List>
                  {index < userData?.addresses.length - 1 && <Divider />}
                </div>
              )
          )}
        </CardContent>
      </Card>

      {/* Billing Addresses */}
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Billing Addresses</Typography>
          {userData?.addresses.map(
            (address: any, index: number) =>
              isBillingAddress(address.id) && (
                <div key={index}>
                  <List>
                    <ListItem>
                      <Typography variant="body1">
                        {address.streetName}, {address.city},{' '}
                        {address.postalCode}, {address.country}
                      </Typography>
                      {isDefaultBilling(address.id) && (
                        <Chip
                          label="Default Billing"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '10px' }}
                        />
                      )}
                    </ListItem>
                  </List>
                  {index < userData?.addresses.length - 1 && <Divider />}
                </div>
              )
          )}
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: '80%',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <UserProfileEdit />
        </div>
      </Modal>
    </Paper>
  );
};
