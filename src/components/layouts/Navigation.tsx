import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';
import { getUserFromStorage } from '../../utils/auth';
import CartDrawer from '../specific/CartDrawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCart } from '../../commercetools-api/createCart';
import { updateCartQuantity } from '../../store/cartSlice';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/categories', name: 'Categories' },
  { path: '/about', name: 'About Us' },
];

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = getUserFromStorage();
  const [openCart, setOpenCart] = React.useState(false);
  const itemsQuantity = useSelector(
    (state: RootState) => state.cart.itemsQuantity
  );

  getCart()
    .then((cartData) => {
      const totalItems = cartData.lineItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );
      dispatch(updateCartQuantity(totalItems));
    })
    .catch((error) => {
      console.error('Failed to fetch cart data:', error);
    });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LunchDiningOutlinedIcon
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              cursor: 'pointer',
            }}
          />
          <Typography
            onClick={() => navigate('/')}
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Grandma's Busket
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}

              {!isLoggedIn && (
                <MenuItem
                  key="Login"
                  onClick={() => {
                    navigate('/login');
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}

              {!isLoggedIn && (
                <MenuItem
                  key="Register"
                  onClick={() => {
                    navigate('/register');
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              )}
              <MenuItem
                key="about"
                onClick={() => {
                  navigate('/about');
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">About Us</Typography>
              </MenuItem>

              <MenuItem key="Cart" onClick={() => setOpenCart(true)}>
                <Typography textAlign="center">Cart</Typography>
                <Badge badgeContent={itemsQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Menu>
          </Box>
          <LunchDiningOutlinedIcon
            onClick={() => navigate('/')}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            onClick={() => navigate('/')}
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Grandma's Busket
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  navigate(page.path);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            {!isLoggedIn && (
              <Button
                key="Login"
                onClick={() => {
                  navigate('/login');
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            )}

            {!isLoggedIn && (
              <Button
                key="Register"
                onClick={() => {
                  navigate('/register');
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button>
            )}
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={() => setOpenCart(true)}
            >
              Cart
              <Badge badgeContent={itemsQuantity} color="secondary">
                <ShoppingCartIcon sx={{ ml: 1 }} />
              </Badge>
            </Button>
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${user?.firstName} ${user?.lastName}`}
                  >{`${user?.firstName[0]}${user?.lastName[0]}`}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="Profile"
                  onClick={() => {
                    navigate('/profile');
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="Logout"
                  onClick={() => {
                    handleLogout();
                    dispatch(logout());
                    handleCloseUserMenu();
                    navigate('/');
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        customerID={user?.id}
      />
    </AppBar>
  );
};
export default ResponsiveAppBar;
