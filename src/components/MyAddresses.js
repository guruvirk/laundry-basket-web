import React, { useEffect, useState } from 'react';
import AddressPicker from '../Modals/AddressPicker';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { AddLocation, Delete, Edit } from '@mui/icons-material';

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
        setAddresses(user.addresses);
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
        setAddresses(user.addresses);
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
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          My Addresses
        </Typography>

        {addresseLoaded && (
          <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 6, pb: 4 }}>
            {addresses.map((address, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Stack
                  direction='column'
                  spacing={1}
                  useFlexGap
                  sx={{
                    borderRadius: '15px',
                    py: 4,
                    px: 2,
                    border: '1px solid',
                    borderColor: 'hsla(220, 25%, 25%, .3)',
                    boxShadow: 'none',
                    position: 'relative',
                  }}
                >
                  <Grid container spacing={2.5}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                        {address.address1}, {address.address2}{' '}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                        {address.city}, {address.state}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                        {address.zipCode}
                      </Typography>
                      {address.isDefault && (
                        <Box
                          className='flex items-center ml-3 px-3 py-1.5'
                          style={{
                            borderTopRightRadius: '14px',
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
                          <Typography className='font-semibold text-white text-center'>Default</Typography>
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
                          <Edit></Edit>
                        </IconButton>
                        <IconButton className='ml-3 flex items-center justify-center'>
                          <Delete></Delete>
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
        <Button onClick={() => openAddressDialog(null)} variant='contained' startIcon={<AddLocation />}>
          Add Address
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
            ></AddressPicker>
          </div>
        </Modal>
      </Box>
    </Container>
  );
}

export default MyAddresses;
