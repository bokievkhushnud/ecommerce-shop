import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

interface Props {
  label: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<Props> = ({ label, onChange }) => {
  return (
    <MuiTextField
      label={label}
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextField;
