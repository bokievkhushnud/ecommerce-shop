import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Box,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface SearchAndFilterProps {
  selectedFilter: string;
  onFilterChange: (event: SelectChangeEvent<string>) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  selectedFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        variant="outlined"
        style={{ flex: 1, marginRight: '15px' }}
      />
      <FormControl variant="outlined" style={{ minWidth: '200px' }}>
        <InputLabel>Sort</InputLabel>
        <Select label="Sort" value={selectedFilter} onChange={onFilterChange}>
          <MenuItem value="Default">Default</MenuItem>
          <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
          <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
          <MenuItem value="Name (A-Z)">Name (A-Z)</MenuItem>
          <MenuItem value="Name (Z-A)">Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{ marginLeft: '15px', height: '55px' }}
      >
        <FilterListIcon />
        Filters
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-dialog-title"
        maxWidth="sm"
        fullWidth
        style={{ borderRadius: '16px' }}
      >
        <DialogTitle id="filter-dialog-title">Filter Options</DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              defaultValue={[0, 200]}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={200}
            />
          </Box>

          <FormGroup>
            <Box mb={2}>
              <Typography gutterBottom>Flavor</Typography>
              <FormControlLabel control={<Checkbox />} label="Spicy" />
              <FormControlLabel control={<Checkbox />} label="Sweet" />
            </Box>

            <Box mb={2}>
              <Typography gutterBottom>Dietary</Typography>
              <FormControlLabel control={<Checkbox />} label="Organic" />
              <FormControlLabel control={<Checkbox />} label="Vegan" />
              <FormControlLabel control={<Checkbox />} label="Vegetarian" />
            </Box>

            <Box mb={2}>
              <Typography gutterBottom>Portion Sizes</Typography>
              <FormControlLabel control={<Checkbox />} label="Small" />
              <FormControlLabel control={<Checkbox />} label="Medium" />
              <FormControlLabel control={<Checkbox />} label="Large" />
            </Box>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary">
            Reset
          </Button>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchAndFilter;
