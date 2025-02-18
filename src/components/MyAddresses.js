import React, { useEffect, useState } from 'react';
import AddressPicker from '../Modals/AddressPicker';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { AddLocation, Delete, Edit, Phone } from '@mui/icons-material';

function MyAddresses(props) {
  const navigate = useNavigate();

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addresseLoaded, setAddresseLoaded] = useState(false);

  useEffect(() => {
    if (props.isLoggedIn === false) {
      navigate('/');
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user && user.addresses && user.addresses.length) {
        let addressesArr = user.addresses;
        addressesArr.sort((a, b) => b.isDefault - a.isDefault);
        setAddresses(addressesArr);
      }
    }
    setAddresseLoaded(true);
  }, [navigate, props.isLoggedIn]);

  const openAddressDialog = (id) => {
    if (id || id === 0) {
      setAddressId(id);
    }
    setTimeout(() => {
      setIsAddressDialogOpen(true);
    });
  };

  const closeAddressDialog = () => {
    setAddressId(null);
    setIsAddressDialogOpen(false);
  };

  const refreshAddress = () => {
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user && user.addresses && user.addresses.length) {
        let addressesArr = user.addresses;
        addressesArr.sort((a, b) => b.isDefault - a.isDefault);
        setAddresses(addressesArr);
        props.setUser(user);
      }
    }
    setAddresseLoaded(true);
  };

  return (
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Typography component='h4' variant='h4' sx={{ color: 'text.primary' }}>
          My Addresses
        </Typography>

        {addresseLoaded && (
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={2.5}
            sx={{ pt: 6, pb: 4, width: '85%', mx: 'auto' }}
          >
            {addresses.map((address, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Stack
                  direction='column'
                  spacing={1}
                  useFlexGap
                  sx={{
                    borderRadius: '15px',
                    py: 4,
                    px: 2,
                    border: '1.5px solid',
                    borderColor: 'hsla(220, 25%, 25%, .5)',
                    boxShadow: 'none',
                    position: 'relative',
                  }}
                >
                  <Grid container spacing={2.5}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography sx={{ color: 'text.secondary', textAlign: 'start', pb: 1 }} variant='h6'>
                        {address.name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                        {address.address1}, {address.address2}{' '}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                        {address.city}, {address.state}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                        {address.zipCode}
                      </Typography>
                      <Typography
                        sx={{ color: 'text.secondary', textAlign: 'start', fontWeight: 'bold', pt: 0.5 }}
                        variant='h6'
                      >
                        <Phone sx={{ fontSize: 18 }} /> {address.phone}
                      </Typography>
                      {address.isDefault && (
                        <Box
                          className='flex items-center ml-3 px-3 py-1.5'
                          style={{
                            borderTopRightRadius: '13px',
                            borderBottomLeftRadius: '14px',
                            backgroundColor: '#0095ff',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            marginLeft: 'auto',
                            alignContent: 'flex-end',
                            zIndex: 30,
                          }}
                        >
                          <Typography variant='subtitle1' className='text-white text-center'>
                            Default
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: '100%',
                        }}
                      >
                        <IconButton onClick={() => openAddressDialog(index)} className='flex items-center justify-center'>
                          <Edit sx={{ fontSize: 27 }}></Edit>
                        </IconButton>
                        <IconButton className='ml-3 flex items-center justify-center'>
                          <Delete sx={{ fontSize: 27 }}></Delete>
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
        <Button
          sx={{ mb: 2 }}
          className='primary-contained'
          onClick={() => openAddressDialog(null)}
          variant='contained'
          startIcon={<AddLocation />}
        >
          <Typography className='text-white-imp' component='h6' variant='nav' textAlign='center'>
            Add Address
          </Typography>
        </Button>
        <Modal
          open={isAddressDialogOpen}
          onClose={() => setIsAddressDialogOpen(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div>
            <AddressPicker
              closeModal={closeAddressDialog}
              refreshAddress={refreshAddress}
              addressId={addressId}
              canUpdate={true}
              user={props.user}
              addresses={addresses}
            ></AddressPicker>
          </div>
        </Modal>
      </Box>
    </Container>
  );
}

export default MyAddresses;
