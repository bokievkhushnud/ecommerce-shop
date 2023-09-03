import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleEditMode } from '../store/userProfileSlice';

interface UserProfileEditProps {
  userData: any;
  handleUpdate: (updatedData: any) => void;
}

export const UserProfileEdit: React.FC<UserProfileEditProps> = ({
  userData,
  handleUpdate,
}) => {
  const [updatedData, setUpdatedData] = useState<any>(userData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleUpdate(updatedData);
  };

  const dispatch = useDispatch();

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Edit User Profile
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="First Name"
        name="firstName"
        value={updatedData.firstName}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Last Name"
        name="lastName"
        value={updatedData.lastName}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={updatedData.dateOfBirth}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Email"
        name="email"
        value={updatedData.email}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px', marginLeft: '20px' }}
        onClick={() => dispatch(toggleEditMode())}
      >
        Cancel
      </Button>
    </Paper>
  );
};
