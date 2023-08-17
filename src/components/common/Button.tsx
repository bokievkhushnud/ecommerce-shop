import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface Props {
  label: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <MuiButton variant="contained" color="primary" onClick={onClick}>
      {label}
    </MuiButton>
  );
};

export default Button;
