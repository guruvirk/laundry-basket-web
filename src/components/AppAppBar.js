import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ToggleColorMode from './ToggleColorMode';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Tooltip, Typography } from '@mui/material';
import { LocationOn, Person } from '@mui/icons-material';

function AppAppBar({ mode, toggleColorMode, isLoggedIn, user, logout }) {
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigation = useNavigate();

  const settings = ['My Addresses', 'Account', 'Logout'];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const openLogin = () => {
    setOpen(false);
    navigation('/login');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === 'Logout') {
      setAnchorElUser(null);
      logout();
    }
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <AppBar position='fixed' sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none' }}>
      <Toolbar
        variant='regular'
        sx={(theme) => ({
          paddingY: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          backdropFilter: 'blur(24px)',
          maxHeight: 40,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          boxShadow: '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)',
          ...theme.applyStyles('dark', {
            bgcolor: 'hsla(220, 0%, 0%, 0.7)',
            boxShadow: '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
          }),
        })}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Link to='/'>
            <img style={{ height: 90 }} src={require('../assets/images/logo.png')} alt='logo' />
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, pl: 2 }}>
            <Button variant='text' color='info' size='small' onClick={() => scrollToSection('features')}>
              Services
            </Button>
            <Button variant='text' color='info' size='small' onClick={() => scrollToSection('testimonials')}>
              Pricing
            </Button>
            <Button variant='text' color='info' size='small' onClick={() => scrollToSection('highlights')}>
              About Us
            </Button>
            <Button variant='text' color='info' size='small' onClick={() => scrollToSection('pricing')}>
              Contact Us
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 0.5,
            alignItems: 'center',
          }}
        >
          <ToggleColorMode data-screenshot='toggle-mode' mode={mode} toggleColorMode={toggleColorMode} />
          {isLoggedIn ? null : (
            <Button onClick={openLogin} color='primary' variant='contained' size='small'>
              Login
            </Button>
          )}
        </Box>
        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
          <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor='top' open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 3 }} />
              <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
              <MenuItem onClick={() => scrollToSection('testimonials')}>Testimonials</MenuItem>
              <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
              <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
              <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
              {isLoggedIn ? null : (
                <MenuItem>
                  <Button onClick={openLogin} color='primary' variant='contained' fullWidth>
                    Login
                  </Button>
                </MenuItem>
              )}
            </Box>
          </Drawer>
        </Box>
        {isLoggedIn ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ backgroundColor: 'primary.main', color: 'white' }} alt='username' src={user.pic}>
                  {user.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              {settings.map((setting) => (
                <MenuItem
                  sx={{ px: 2, display: 'block', borderBottomWidth: 1 }}
                  key={setting}
                  onClick={() => (setting === 'Logout' ? handleMenuItemClick(setting) : {})}
                >
                  {setting === 'Logout' ? (
                    <Typography sx={{ marginLeft: 0.5 }} variant='subtitle1' textAlign='start'>
                      {setting}
                    </Typography>
                  ) : (
                    <Link to={setting === 'My Addresses' ? '/my-addresses' : setting === 'Account' ? '/my-profile' : ''}>
                      <Typography sx={{ marginLeft: 0.5 }} variant='subtitle1' textAlign='start'>
                        {setting}
                      </Typography>
                      {setting === 'My Addresses' && user.addresses && user.addresses.length && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <LocationOn sx={{ fontSize: 15 }} />
                          <Typography variant='body2' textAlign='start'>
                            {user.addresses[0].city} {user.addresses[0].zipCode}
                          </Typography>
                        </Box>
                      )}
                      {setting === 'Account' && user.addresses && user.addresses.length && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Person sx={{ fontSize: 15 }} />
                          <Typography variant='body2' textAlign='start'>
                            {user.name}
                          </Typography>
                        </Box>
                      )}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
