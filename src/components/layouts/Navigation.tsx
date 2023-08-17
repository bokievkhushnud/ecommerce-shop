import React from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          Grandma's Shop
        </Typography>
        <Tabs>
          <Tab label="Main" component={Link} to="/" />
          <Tab label="Login" component={Link} to="/login" />
          <Tab label="Register" component={Link} to="/registration" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
