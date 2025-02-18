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
  Stack,
  Typography,
} from '@mui/material';
import {
  Alarm,
  CheckCircle,
  CloseRounded,
  CreditCard,
  LocationOn,
  Money,
  PermContactCalendar,
  Phone,
} from '@mui/icons-material';
import moment from 'moment';
import { createOrder, createTransactionOrder } from '../utils/api_base';
import PayOrder from './PayOrder';
import Icon from '@mui/material/Icon';

const modalStyle = {
  position: 'absolute',
  width: { xs: '92.5%', sm: '80%', md: '60%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  px: { xs: 2, sm: 4 },
  py: 2,
  textAlign: 'center',
  maxHeight: '75vh',
  overflowY: 'scroll'
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
        <Box className='comfirmModal' sx={modalStyle}>
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
          {/* <Typography sx={{ color: 'text.primary' }} variant='h5' textAlign='center'>
            Order Summary
          </Typography> */}
          <Grid container alignItems='flex-start' justifyContent='center' spacing={1} sx={{ pb: 1 }}>
            <Grid item xs={12} sm={6} md={6} alignItems='flex-start' justifyContent='center' spacing={1} sx={{ mt: 1 }}>
              <Box
                sx={{
                  height: { xs: 'auto', sm: '225px' },
                }}
              >
                <Typography
                  sx={{ my: { xs: 1, sm: 2 }, color: 'text.primary', textAlign: 'start' }}
                  variant='h6'
                  textAlign='center'
                >
                  Delivery
                </Typography>
                <Stack direction='row' spacing={1.5} useFlexGap justifyContent='start' alignItems='start'>
                  <Box
                    sx={{
                      px: { xs: 1, sm: 0 },
                      py: { xs: 1, sm: 1 },
                      backgroundColor: delivery === 'standard' ? 'primary.main' : 'actionLite.selected',
                      borderRadius: '15px',
                      width: { xs: '45%', sm: '45%', md: '33%' },
                    }}
                  >
                    <div onClick={() => setDelivery('standard')} style={{ cursor: 'pointer', position: 'relative' }}>
                      <img
                        className='summaryOptionIcon'
                        src={
                          delivery === 'standard'
                            ? require('../assets/images/icons/standard-white.png')
                            : require('../assets/images/icons/standard-blue.png')
                        }
                        alt='new'
                      />
                      <Typography
                        sx={{ color: delivery === 'standard' ? 'white' : 'text.primary', fontWeight: 'bold' }}
                        variant='subtitle1'
                        textAlign='center'
                      >
                        Standard
                      </Typography>
                      {delivery === 'standard' && (
                        <IconButton
                          className='flex items-center'
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: 0,
                            marginLeft: 'auto',
                            alignContent: 'flex-end',
                            zIndex: 30,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 25, color: 'white' }} />
                        </IconButton>
                      )}
                    </div>
                  </Box>
                  <Box
                    sx={{
                      px: { xs: 1, sm: 0 },
                      py: { xs: 1, sm: 1 },
                      backgroundColor: delivery === 'express' ? 'primary.main' : 'actionLite.selected',
                      borderRadius: '15px',
                      width: { xs: '45%', sm: '45%', md: '33%' },
                    }}
                  >
                    <div onClick={() => setDelivery('express')} style={{ cursor: 'pointer', position: 'relative' }}>
                      <img
                        className='summaryOptionIcon'
                        src={
                          delivery === 'express'
                            ? require('../assets/images/icons/express-white.png')
                            : require('../assets/images/icons/express-blue.png')
                        }
                        alt='new'
                      />
                      <Typography
                        sx={{ color: delivery === 'express' ? 'white' : 'text.primary', fontWeight: 'bold' }}
                        variant='subtitle1'
                        textAlign='center'
                      >
                        Express
                      </Typography>
                      {delivery === 'express' && (
                        <IconButton
                          className='flex items-center'
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: 0,
                            marginLeft: 'auto',
                            alignContent: 'flex-end',
                            zIndex: 30,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 25, color: 'white' }} />
                        </IconButton>
                      )}
                    </div>
                  </Box>
                </Stack>
                <Typography
                  component='p'
                  sx={{ mt: { xs: 1, sm: 2 }, mb: 0.5, color: 'text.primary', textAlign: 'start', fontWeight: 'bold' }}
                  variant='subtitile1'
                >
                  Note:
                </Typography>
                {delivery === 'standard' ? (
                  <Typography
                    sx={{ mt: 0.5, color: 'text.secondary', marginRight: 2, textAlign: 'left' }}
                    variant='subtitle2'
                  >
                    Free Standard delivery worth $5 on order above $20.
                  </Typography>
                ) : (
                  <Typography
                    sx={{ mt: 0.5, color: 'text.secondary', marginRight: 2, textAlign: 'left' }}
                    variant='subtitle2'
                  >
                    Express delivery worth $10 would be only $5 on order above $20.
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{ mt: { xs: 2, sm: 3 }, mb: 1, color: 'text.primary', textAlign: 'start' }}
                variant='h6'
                textAlign='center'
              >
                Pick-up and Address
              </Typography>
              <Stack
                direction='row'
                spacing={0.5}
                sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 0.5, sm: 1.5 } }}
                useFlexGap
                justifyContent='start'
                alignItems='start'
              >
                <Alarm />
                <Typography
                  item
                  sx={{ color: 'text.secondary', display: 'inline', textAlign: 'start' }}
                  variant='title'
                  component='p'
                >
                  {`${moment(props.selectedDate).format('ddd DD, MMM YYYY')}`} {`${props.selectedSlot}`}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={0.5} useFlexGap justifyContent='start' alignItems='start'>
                <LocationOn />
                <Box>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} component='p' variant='title'>
                    {props.address.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle2'>
                    {props.address.address1}, {props.address.address2}, {props.address.city}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle2'>
                    {props.address.state} {props.address.zipCode}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                    <Phone sx={{ fontSize: 16 }} /> {props.address.phone}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6} alignItems='flex-start' justifyContent='center' spacing={1} sx={{ mt: 1 }}>
              <Box
                sx={{
                  height: { xs: 'auto', sm: '225px' },
                }}
              >
                <Typography
                  sx={{ my: { xs: 1, sm: 2 }, color: 'text.primary', textAlign: 'start' }}
                  variant='h6'
                  textAlign='center'
                >
                  Payment
                </Typography>
                <Stack direction='row' spacing={1.5} useFlexGap justifyContent='start' alignItems='start'>
                  <Box
                    sx={{
                      px: { xs: 1, sm: 0 },
                      py: { xs: 1, sm: 1 },
                      backgroundColor: payment === 'card' ? 'primary.main' : 'actionLite.selected',
                      borderRadius: '15px',
                      width: { xs: '45%', sm: '45%', md: '33%' },
                    }}
                  >
                    <div onClick={() => setPayment('card')} style={{ cursor: 'pointer', position: 'relative' }}>
                      <img
                        className='summaryOptionIcon'
                        src={
                          payment === 'card'
                            ? require('../assets/images/icons/card-white.png')
                            : require('../assets/images/icons/card-blue.png')
                        }
                        alt='new'
                      />
                      <Typography
                        sx={{ color: payment === 'card' ? 'white' : 'text.primary', fontWeight: 'bold' }}
                        variant='subtitle1'
                        textAlign='center'
                      >
                        Credit Card
                      </Typography>
                      {payment === 'card' && (
                        <IconButton
                          className='flex items-center'
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: 0,
                            marginLeft: 'auto',
                            alignContent: 'flex-end',
                            zIndex: 30,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 25, color: 'white' }} />
                        </IconButton>
                      )}
                    </div>
                  </Box>
                  <Box
                    sx={{
                      px: { xs: 1, sm: 0 },
                      py: { xs: 1, sm: 1 },
                      backgroundColor: payment === 'cash' ? 'primary.main' : 'actionLite.selected',
                      borderRadius: '15px',
                      width: { xs: '45%', sm: '45%', md: '33%' },
                    }}
                  >
                    <div onClick={() => setPayment('cash')} style={{ cursor: 'pointer', position: 'relative' }}>
                      <img
                        className='summaryOptionIcon'
                        src={
                          payment === 'cash'
                            ? require('../assets/images/icons/cash-white.png')
                            : require('../assets/images/icons/cash-blue.png')
                        }
                        alt='new'
                      />
                      <Typography
                        sx={{ color: payment === 'cash' ? 'white' : 'text.primary', fontWeight: 'bold' }}
                        variant='subtitle1'
                        textAlign='center'
                      >
                        Cash
                      </Typography>
                      {payment === 'cash' && (
                        <IconButton
                          className='flex items-center'
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: 0,
                            marginLeft: 'auto',
                            alignContent: 'flex-end',
                            zIndex: 30,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 25, color: 'white' }} />
                        </IconButton>
                      )}
                    </div>
                  </Box>
                </Stack>
                {payment === 'card' && (
                  <>
                    <Typography
                      component='p'
                      sx={{ mt: { xs: 1, sm: 2 }, mb: 0.5, color: 'text.primary', textAlign: 'start', fontWeight: 'bold' }}
                      variant='subtitile1'
                    >
                      Accepted Cards:
                    </Typography>
                    <Stack direction='row' spacing={2.5} useFlexGap justifyContent='start' alignItems='start'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
                        <g class='nc-icon-wrapper'>
                          <rect x='2' y='7' width='28' height='18' rx='3' ry='3' fill='#1434cb' stroke-width='0'></rect>
                          <path
                            d='m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z'
                            stroke-width='0'
                            opacity='.15'
                          ></path>
                          <path
                            d='m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z'
                            fill='#fff'
                            opacity='.2'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m13.392,12.624l-2.838,6.77h-1.851l-1.397-5.403c-.085-.332-.158-.454-.416-.595-.421-.229-1.117-.443-1.728-.576l.041-.196h2.98c.38,0,.721.253.808.69l.738,3.918,1.822-4.608h1.84Z'
                            fill='#fff'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m20.646,17.183c.008-1.787-2.47-1.886-2.453-2.684.005-.243.237-.501.743-.567.251-.032.943-.058,1.727.303l.307-1.436c-.421-.152-.964-.299-1.638-.299-1.732,0-2.95.92-2.959,2.238-.011.975.87,1.518,1.533,1.843.683.332.912.545.909.841-.005.454-.545.655-1.047.663-.881.014-1.392-.238-1.799-.428l-.318,1.484c.41.188,1.165.351,1.947.359,1.841,0,3.044-.909,3.05-2.317'
                            fill='#fff'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m25.423,12.624h-1.494c-.337,0-.62.195-.746.496l-2.628,6.274h1.839l.365-1.011h2.247l.212,1.011h1.62l-1.415-6.77Zm-2.16,4.372l.922-2.542.53,2.542h-1.452Z'
                            fill='#fff'
                            stroke-width='0'
                          ></path>
                          <path
                            fill='#fff'
                            stroke-width='0'
                            d='M15.894 12.624L14.446 19.394 12.695 19.394 14.143 12.624 15.894 12.624z'
                          ></path>
                        </g>
                      </svg>
                      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
                        <g class='nc-icon-wrapper'>
                          <rect x='2' y='7' width='28' height='18' rx='3' ry='3' fill='#fff' stroke-width='0'></rect>
                          <path
                            d='m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z'
                            stroke-width='0'
                            opacity='.15'
                          ></path>
                          <path
                            d='m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z'
                            fill='#fff'
                            opacity='.2'
                            stroke-width='0'
                          ></path>
                          <path fill='#ff5f00' stroke-width='0' d='M13.597 11.677H18.407V20.32H13.597z'></path>
                          <path
                            d='m13.902,15.999c0-1.68.779-3.283,2.092-4.322-2.382-1.878-5.849-1.466-7.727.932-1.863,2.382-1.451,5.833.947,7.712,2,1.573,4.795,1.573,6.795,0-1.329-1.038-2.107-2.642-2.107-4.322Z'
                            fill='#eb001b'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m24.897,15.999c0,3.039-2.459,5.497-5.497,5.497-1.237,0-2.428-.412-3.39-1.176,2.382-1.878,2.795-5.329.916-7.727-.275-.336-.58-.657-.916-.916,2.382-1.878,5.849-1.466,7.712.932.764.962,1.176,2.153,1.176,3.39Z'
                            fill='#f79e1b'
                            stroke-width='0'
                          ></path>
                        </g>
                      </svg>
                      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
                        <g class='nc-icon-wrapper'>
                          <rect x='2' y='7' width='28' height='18' rx='3' ry='3' fill='#0f70ce' stroke-width='0'></rect>
                          <path
                            d='m27.026,9l-.719,1.965-.708-1.965h-3.885v2.582l-1.136-2.582h-3.119l-3.259,7.409h2.637v6.591h8.097l1.316-1.458,1.322,1.458h2.244c.112-.314.184-.647.184-1v-1.041l-1.58-1.698,1.58-1.655v-7.606c0-.353-.072-.686-.184-1h-2.79Z'
                            fill='#fff'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m17.679,14.433h2.61l.502,1.148h1.78l-2.531-5.754h-2.039l-2.531,5.754h1.734l.477-1.148Zm1.307-3.135l.775,1.844h-1.535l.761-1.844Z'
                            fill='#0f70ce'
                            stroke-width='0'
                          ></path>
                          <path
                            fill='#0f70ce'
                            stroke-width='0'
                            d='M22.542 9.827L25.018 9.827 26.302 13.39 27.604 9.827 30 9.827 30 15.581 28.45 15.581 28.45 11.603 26.977 15.581 25.608 15.581 24.124 11.631 24.124 15.581 22.542 15.581 22.542 9.827z'
                          ></path>
                          <path
                            fill='#0f70ce'
                            stroke-width='0'
                            d='M19.24 20.82L19.24 19.944 22.484 19.944 22.484 18.624 19.24 18.624 19.24 17.748 22.565 17.748 22.565 16.409 17.664 16.409 17.664 22.173 22.565 22.173 22.565 20.82 19.24 20.82z'
                          ></path>
                          <path
                            fill='#0f70ce'
                            stroke-width='0'
                            d='M24.638 16.409L26.271 18.234 27.968 16.409 30 16.409 27.283 19.254 30 22.173 27.939 22.173 26.249 20.309 24.567 22.173 22.537 22.173 25.272 19.275 22.537 16.409 24.638 16.409z'
                          ></path>
                          <path
                            d='m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z'
                            stroke-width='0'
                            opacity='.15'
                          ></path>
                          <path
                            d='m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z'
                            fill='#fff'
                            opacity='.2'
                            stroke-width='0'
                          ></path>
                        </g>
                      </svg>
                      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
                        <g class='nc-icon-wrapper'>
                          <rect x='2' y='7' width='28' height='18' rx='3' ry='3' fill='#fff' stroke-width='0'></rect>
                          <path
                            d='m27,7h-8c4.971,0,9,4.029,9,9s-4.029,9-9,9h8c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Z'
                            fill='#f47922'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z'
                            stroke-width='0'
                            opacity='.15'
                          ></path>
                          <path
                            d='m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z'
                            fill='#fff'
                            opacity='.2'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m5.081,14.116h-1.081v3.777h1.076c.572,0,.985-.135,1.348-.436.431-.357.686-.894.686-1.45,0-1.115-.833-1.891-2.027-1.891Zm.86,2.837c-.231.209-.532.3-1.008.3h-.198v-2.497h.198c.476,0,.765.085,1.008.305.255.227.408.578.408.94s-.153.725-.408.952Z'
                            fill='#231f20'
                            stroke-width='0'
                          ></path>
                          <path fill='#231f20' stroke-width='0' d='M7.448 14.116H8.185V17.893H7.448z'></path>
                          <path
                            d='m9.986,15.565c-.442-.164-.572-.271-.572-.475,0-.238.231-.419.549-.419.221,0,.402.091.594.306l.386-.505c-.317-.277-.696-.419-1.11-.419-.668,0-1.178.464-1.178,1.082,0,.52.237.787.929,1.036.288.102.435.17.509.215.147.096.221.232.221.391,0,.306-.243.533-.572.533-.351,0-.634-.175-.804-.504l-.476.458c.339.498.747.719,1.308.719.766,0,1.303-.509,1.303-1.24,0-.6-.248-.872-1.086-1.178Z'
                            fill='#231f20'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m11.305,16.007c0,1.11.872,1.971,1.994,1.971.317,0,.589-.062.924-.22v-.867c-.295.295-.555.414-.889.414-.742,0-1.269-.538-1.269-1.303,0-.725.543-1.297,1.234-1.297.351,0,.617.125.924.425v-.867c-.323-.164-.589-.232-.906-.232-1.116,0-2.011.878-2.011,1.976Z'
                            fill='#231f20'
                            stroke-width='0'
                          ></path>
                          <path
                            fill='#231f20'
                            stroke-width='0'
                            d='M20.063 16.653L19.056 14.116 18.251 14.116 19.854 17.99 20.25 17.99 21.882 14.116 21.083 14.116 20.063 16.653z'
                          ></path>
                          <path
                            fill='#231f20'
                            stroke-width='0'
                            d='M22.215 17.893L24.304 17.893 24.304 17.253 22.951 17.253 22.951 16.234 24.254 16.234 24.254 15.594 22.951 15.594 22.951 14.756 24.304 14.756 24.304 14.116 22.215 14.116 22.215 17.893z'
                          ></path>
                          <path
                            d='m27.221,15.231c0-.707-.487-1.115-1.337-1.115h-1.092v3.777h.736v-1.517h.096l1.02,1.517h.906l-1.189-1.591c.555-.113.861-.492.861-1.071Zm-1.478.624h-.216v-1.144h.227c.459,0,.708.192.708.56,0,.38-.249.584-.72.584Z'
                            fill='#231f20'
                            stroke-width='0'
                          ></path>
                          <path
                            d='m18.461,16c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Z'
                            fill='#f47922'
                            stroke-width='0'
                          ></path>
                        </g>
                      </svg>
                    </Stack>
                  </>
                )}
              </Box>
              <Typography
                sx={{ mt: { xs: 3, sm: 3 }, mb: { xs: 0.5, sm: 1 }, color: 'text.primary', textAlign: 'start' }}
                variant='h6'
                textAlign='center'
              >
                {typeValue === 0 ? 'Selected Items' : 'Services'}
              </Typography>
              <Box
                sx={{
                  maxHeight: { xs: '120px', sm: '150px' },
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
                    sx={{ borderBottomWidth: 1, py: { xs: 0.2, sm: 0.5 } }}
                  >
                    <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2' component='h6'>
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
                        <Typography sx={{ color: 'text.secondary', pr: 1 }} variant='subtitle2' component='h6'>
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
                    sx={{ borderBottomWidth: 1, py: { xs: 0.2, sm: 0.5 } }}
                  >
                    <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2' component='h6'>
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
                        <Typography sx={{ color: 'text.secondary', pr: 1 }} variant='subtitle2' component='h6'>
                          $ {delivery === 'express' ? (amount < 20 ? '10.00' : '5.00') : '5.00'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
              <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ borderBottomWidth: 1, py: { xs: 0.2, sm: 0.5 } }}>
                <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                  <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle2' component='p'>
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
                    <Typography sx={{ color: 'text.secondary', fontWeight: 'bold', pr: 1 }} variant='body1' component='h6'>
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
          <Button onClick={create} sx={{ mt: { xs: 2, sm: 2 }, px: 4, mb: 1 }} variant='contained'>
            {loading ? (
              <CircularProgress size={25} color='inherit' />
            ) : (
              <Typography variant='title'>{payment === 'card' ? 'Pay & Confirm' : 'Confirm Order'}</Typography>
            )}
          </Button>
        </Box>
      )}
    </>
  );
}

export default ConfirmOrder;
