import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const SearchAndFilter: React.FC = () => {
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <TextField label="Search" variant="outlined" style={{ flex: 1 }} />
      <FormControl variant="outlined" style={{ marginLeft: '20px' }}>
        <InputLabel>Filter</InputLabel>
        <Select label="Filter">
          <MenuItem>Price: Low to High</MenuItem>
          <MenuItem>Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: '20px' }}
      >
        Apply
      </Button>
    </div>
  );
};

export default SearchAndFilter;
