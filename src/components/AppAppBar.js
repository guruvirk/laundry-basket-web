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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Menu, Tooltip, Typography } from '@mui/material';
import { AttachMoney, House, Info, LocalLaundryService, LocationOn, Person } from '@mui/icons-material';

function AppAppBar({ mode, toggleColorMode, isLoggedIn, user, logout }) {
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigation = useNavigate();
  const location = useLocation();

  const settings = ['Orders', 'My Addresses', 'Account', 'Logout'];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {}, [user]);

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
      setOpen(false);
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
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          ...theme.applyStyles('dark', {
            bgcolor: 'hsla(220, 0%, 0%, 0.7)',
          }),
        })}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Link to='/'>
            <img alt='logo' className='header-logo' src={require('../assets/images/logo.png')} />
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, pl: 2 }}>
            <Button
              sx={{
                backgroundColor: location.pathname === '/' ? 'primary.main' : 'white',
                px: 2,
              }}
              className='nav-buttons'
              onClick={() => navigation('/')}
              startIcon={<House sx={{ color: location.pathname === '/' ? 'white' : 'primary.main' }} />}
            >
              <Typography
                sx={{ color: location.pathname === '/' ? 'white' : 'primary.main' }}
                variant='nav'
                textAlign='center'
              >
                Home
              </Typography>
            </Button>
            <Button className='nav-buttons' onClick={() => scrollToSection('about')} startIcon={<Info />}>
              <Typography variant='nav' textAlign='center'>
                About Us
              </Typography>
            </Button>
            <Button className='nav-buttons' onClick={() => scrollToSection('services')} startIcon={<LocalLaundryService />}>
              <Typography variant='nav' textAlign='center'>
                Services
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: location.pathname === '/pricing' ? 'primary.main' : 'white',
                px: 2,
              }}
              className='nav-buttons'
              onClick={() => navigation('/pricing')}
              startIcon={<AttachMoney sx={{ color: location.pathname === '/pricing' ? 'white' : 'primary.main' }} />}
            >
              <Typography
                sx={{ color: location.pathname === '/pricing' ? 'white' : 'primary.main' }}
                variant='nav'
                textAlign='center'
              >
                Pricing
              </Typography>
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
          <Button
            sx={{
              backgroundColor: 'primary.main',
              px: 2,
              mr: 2,
            }}
            className='nav-buttons'
            onClick={() => navigation(isLoggedIn ? '/book-order' : '/login')}
          >
            <Typography sx={{ color: 'white' }} variant='nav' textAlign='center'>
              Schedule PickUp
            </Typography>
          </Button>
          <ToggleColorMode sx={{ mr: 2 }} data-screenshot='toggle-mode' mode={mode} toggleColorMode={toggleColorMode} />
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
              <Divider sx={{ my: 1 }} />
              <Link to='/'>
                <MenuItem onClick={() => setOpen(false)}>
                  <Typography variant='subtitle2'>Home</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={() => scrollToSection('about')}>
                <Typography variant='subtitle2'>About Us</Typography>
              </MenuItem>
              <MenuItem onClick={() => scrollToSection('services')}>
                <Typography variant='subtitle2'>Services</Typography>
              </MenuItem>
              <Link to='/pricing'>
                <MenuItem onClick={() => setOpen(false)}>
                  <Typography variant='subtitle2'>Pricing</Typography>
                </MenuItem>
              </Link>
              {isLoggedIn ? (
                <>
                  {settings.map((setting) => (
                    <MenuItem
                      key={'menu' + setting}
                      onClick={() => (setting === 'Logout' ? handleMenuItemClick(setting) : {})}
                    >
                      {setting === 'Logout' ? (
                        <Typography variant='subtitle2'>{setting}</Typography>
                      ) : (
                        <Link
                          onClick={() => {
                            setAnchorElUser(null);
                            setOpen(false);
                          }}
                          to={
                            setting === 'Orders'
                              ? '/orders'
                              : setting === 'My Addresses'
                              ? '/my-addresses'
                              : setting === 'Account'
                              ? '/my-profile'
                              : ''
                          }
                        >
                          <Typography variant='subtitle2'>{setting}</Typography>
                          {setting === 'My Addresses' && user.addresses && user.addresses.length && (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <LocationOn sx={{ fontSize: 15 }} />
                              <Typography>
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
                              <Typography>{user.name}</Typography>
                            </Box>
                          )}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </>
              ) : (
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
                    <Link
                      onClick={() => setAnchorElUser(null)}
                      to={
                        setting === 'Orders'
                          ? '/orders'
                          : setting === 'My Addresses'
                          ? '/my-addresses'
                          : setting === 'Account'
                          ? '/my-profile'
                          : ''
                      }
                    >
                      <Typography sx={{ marginLeft: 0.5 }} variant='subtitle1' textAlign='start'>
                        {setting}
                      </Typography>
                      {setting === 'My Addresses' && user && user.addresses && user.addresses.length && (
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
                      {setting === 'Account' && user && user.addresses && user.addresses.length && (
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
