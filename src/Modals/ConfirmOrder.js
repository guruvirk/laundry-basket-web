import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { CloseRounded, DryCleaning, LocalShipping } from '@mui/icons-material';
import moment from 'moment';
import { createOrder, createTransactionOrder } from '../utils/api_base';
import PayOrder from './PayOrder';

const modalStyle = {
  position: 'absolute',
  width: { xs: '90%', sm: '50%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  px: 4,
  py: 2,
  textAlign: 'center',
};

function ConfirmOrder(props) {
  const [paymentModel, setPaymentModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState('card');
  const [typeValue, setTypeValue] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [order, setOrder] = useState(null);
  const [delivery, setDelivery] = useState('standard');

  useEffect(() => {
    if (props.cart.length) {
      if (props.typeValue) {
        setTypeValue(props.typeValue);
      }
      if (props.amount) {
        setAmount(props.amount);
      }
    }
  }, []);

  const getFormattedMiniAddress = (selectedAddress) => {
    let address = '';
    if (selectedAddress) {
      address = selectedAddress.address2 + ', ' + selectedAddress.city + ', ' + selectedAddress.zipCode;
    }
    return address;
  };

  const create = async () => {
    if (payment === 'card') {
      setPaymentModel(true);
    } else {
      if (order) {
        setLoading(true);
        try {
          let orderModel = {
            type: 'prepared',
            method: 'cod',
          };
          console.log('Cash Create Transaction');
          let orderObj = await createTransactionOrder(order.id, orderModel);
          if (orderObj) {
            console.log('Success');
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
        return;
      }
      let deliveryPrice = 0;
      if (amount < 20 || delivery === 'express') {
        if (delivery === 'express') {
          if (amount < 20) {
            deliveryPrice = 20;
          } else {
            deliveryPrice = 10;
          }
        } else {
          deliveryPrice = 10;
        }
      }
      let orderModel = {
        type: 'prepared',
        discount: 0,
        pickUpDate: props.selectedDate,
        pickUpSlot: props.selectedSlot,
        address: props.address,
        items: props.cart,
        category: 'laundry',
        method: 'cod',
        deliveryType: delivery,
        deliveryPrice,
      };
      setLoading(true);
      try {
        let orderObj = await createOrder(orderModel);
        if (orderObj) {
          setOrder(orderObj);
          setLoading(false);
          console.log('Success');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {paymentModel ? (
        <PayOrder {...props} setOrder={setOrder} setPaymentModel={setPaymentModel} />
      ) : (
        <Box sx={modalStyle}>
          <IconButton
            onClick={() => props.closeModal()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zindex: 999,
              mt: 1,
            }}
            aria-label='delete'
            size='large'
          >
            <CloseRounded sx={{ fontSize: 30 }} />
          </IconButton>
          <Typography sx={{ mt: 1, color: 'text.primary' }} variant='h6' textAlign='center'>
            Confirm Order
          </Typography>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={1}
            sx={{ my: 1, pb: 1 }}
          >
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              alignItems='center'
              justifyContent='center'
              spacing={1}
              sx={{ mt: 1, borderBottomWidth: 1, height: 130 }}
            >
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                spacing={1}
                sx={{ mt: 1, pb: 1, borderBottomWidth: 1 }}
              >
                <Typography variant='subtitle1'>Address</Typography>
              </Grid>
              <Typography item sx={{ color: 'text.secondary', lineHeight: 2 }} variant='body1' component='h6'>
                {getFormattedMiniAddress(props.address)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              alignItems='center'
              justifyContent='center'
              spacing={1}
              sx={{ mt: 1, pb: 1, borderBottomWidth: 1, height: 130 }}
            >
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                spacing={1}
                sx={{ my: 1, pb: 1, borderBottomWidth: 1 }}
              >
                <Typography variant='subtitle1'>Date</Typography>
              </Grid>
              <Typography item sx={{ color: 'text.secondary', lineHeight: 2 }} variant='body1' component='h6'>
                {`${moment(props.selectedDate).format('ddd DD, MMM YYYY')}`}
                <br></br>
                {`${props.selectedSlot}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              alignItems='center'
              justifyContent='center'
              spacing={1}
              sx={{ mt: 1, pb: 1, borderBottomWidth: 1, height: 130 }}
            >
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                spacing={1}
                sx={{ my: 1, pb: 1, borderBottomWidth: 1 }}
              >
                <Typography variant='subtitle1'>Payment</Typography>
              </Grid>
              <RadioGroup sx={{ alignItems: 'center' }} value={payment} onChange={(event) => setPayment(event.target.value)}>
                <FormControlLabel
                  sx={{ mb: 0.5 }}
                  value='card'
                  control={<Radio sx={{ padding: 0, marginX: 1 }} />}
                  label='Card'
                />
                <FormControlLabel value='cash' control={<Radio sx={{ padding: 0, marginX: 1 }} />} label='Cash' />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid
            sx={{ textAlign: 'start', alignItems: 'center', display: 'flex', flexDirection: 'row', pb: 2, pt: 1 }}
            item
            xs={10}
            sm={10}
            md={10}
          >
            <Avatar
              item
              xs={2}
              sm={2}
              md={2}
              sx={{
                background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
              }}
            >
              <LocalShipping />
            </Avatar>
            <Typography item xs={6} sm={6} md={6} sx={{ ml: 2, mr: 4 }} variant='subtitle1'>
              Delivey Type:{' '}
            </Typography>
            <RadioGroup
              sx={{ alignItems: 'start' }}
              row
              value={delivery}
              onChange={(event) => setDelivery(event.target.value)}
            >
              <FormControlLabel value='standard' control={<Radio sx={{ padding: 0, marginX: 1 }} />} label='Standard' />
              <FormControlLabel value='express' control={<Radio sx={{ padding: 0, marginX: 1 }} />} label='Express' />
            </RadioGroup>
          </Grid>
          {/* {delivery === 'standard' ? (
            <Typography sx={{ color: 'text.secondary', marginRight: 2, textAlign: 'left' }} variant='body2'>
              Note: Free Standard delivery worth $5 on order above $20.
            </Typography>
          ) : (
            <Typography sx={{ color: 'text.secondary', marginRight: 2, textAlign: 'left' }} variant='body2'>
              Note: Express delivery worth $10 would be only $5 on order above $20.
            </Typography>
          )} */}
          <Grid
            container
            alignItems='start'
            justifyContent='center'
            spacing={1}
            sx={{ my: 1, pb: 1, borderBottomWidth: 1, marginTop: 1 }}
          >
            <Grid sx={{ textAlign: 'start' }} item xs={12} sm={12} md={12}>
              <Grid alignItems='center' justifyContent='start' container sx={{ mb: 1 }} item xs={12} sm={12} md={12}>
                <Avatar
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  sx={{
                    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                  }}
                >
                  <DryCleaning />
                </Avatar>
                <Typography item xs={6} sm={6} md={6} sx={{ ml: 2 }} variant='subtitle1'>
                  {typeValue === 0 ? 'Selected Items' : 'Services'}
                </Typography>
              </Grid>
              <Box
                sx={{
                  height: '100px',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }}
              >
                {props.cart.map((item, index) => (
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ borderBottomWidth: 1, py: 0.5 }}
                  >
                    <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                      <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                        {item.name} ({item.units})
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                      <Box
                        sx={{
                          width: 'fit-content',
                          ml: 'auto',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                          $ {(Number(item.currentPrice) * item.units).toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
                {(amount < 20 || delivery === 'express') && (
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ borderBottomWidth: 1, py: 0.5 }}
                  >
                    <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                      <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                        {delivery === 'express' ? 'Express Delivery' : 'Standard Delivery'}
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                      <Box
                        sx={{
                          width: 'fit-content',
                          ml: 'auto',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                          $ {delivery === 'express' ? (amount < 20 ? '10.00' : '5.00') : '5.00'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
              <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ borderBottomWidth: 1, py: 0.5 }}>
                <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                  <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <Box
                    sx={{
                      width: 'fit-content',
                      ml: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'text.secondary' }} variant='body1' component='h6'>
                      ${' '}
                      {(
                        Number(amount) + Number(delivery === 'express' ? (amount < 20 ? 10 : 5) : amount < 20 ? 5 : 0)
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button onClick={create} sx={{ mt: 2, px: 4 }} variant='contained'>
            {loading ? (
              <CircularProgress size={25} color='inherit' />
            ) : (
              <Typography variant='subtitle1'>{payment === 'card' ? 'Pay Now' : 'Confirm Order'}</Typography>
            )}
          </Button>
        </Box>
      )}
    </>
  );
}

export default ConfirmOrder;
