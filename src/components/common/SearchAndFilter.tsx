import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SearchAndFilterProps {
  selectedFilter: string;
  onFilterChange: (event: SelectChangeEvent<string>) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <TextField label="Search" variant="outlined" style={{ flex: 1 }} />
      <FormControl variant="outlined" style={{ marginLeft: '20px' }}>
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          style={{ minWidth: '200px' }}
          value={selectedFilter}
          onChange={onFilterChange}
        >
          <MenuItem value="Default">Default</MenuItem>
          <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
          <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
          <MenuItem value="Name">Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchAndFilter;
