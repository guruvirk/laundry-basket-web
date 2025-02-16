import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {
  Add,
  AddLocation,
  AssignmentLate,
  AssignmentTurnedIn,
  CheckCircle,
  DateRange,
  DryCleaning,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocationOn,
  PersonPin,
  Phone,
  Remove,
} from '@mui/icons-material';
import moment from 'moment';
import ConfirmOrder from '../Modals/ConfirmOrder';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonPin />,
    2: <DateRange />,
    3: <DryCleaning />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function BookOrder(props) {
  const navigate = useNavigate();
  const dateInputRef = useRef();

  const [user, setUser] = useState();
  const [userLoaded, setUserLoaded] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [addressSelected, setAddressSelected] = useState(false);
  const [addressNotes, setAddressNotes] = useState('');
  const [deliverySelected, setDeliverySelected] = useState(false);

  let nextDayDate = new Date();
  nextDayDate.setDate(nextDayDate.getDate() + 1);

  let next15DayDate = new Date();
  next15DayDate.setDate(next15DayDate.getDate() + 15);

  let next16DayDate = new Date();
  next16DayDate.setDate(next16DayDate.getDate() + 16);

  let todayDate = new Date();

  const defaultValue =
    new Date().getHours() > 18
      ? {
          year: nextDayDate.getFullYear(),
          month: nextDayDate.getMonth() + 1,
          day: nextDayDate.getUTCDate(),
        }
      : {
          year: todayDate.getFullYear(),
          month: todayDate.getMonth() + 1,
          day: todayDate.getUTCDate(),
        };

  const minimumDate =
    new Date().getHours() > 18
      ? {
          year: nextDayDate.getFullYear(),
          month: nextDayDate.getMonth() + 1,
          day: nextDayDate.getUTCDate(),
        }
      : {
          year: todayDate.getFullYear(),
          month: todayDate.getMonth() + 1,
          day: todayDate.getUTCDate(),
        };

  const maximumDate =
    new Date().getHours() > 18
      ? {
          year: next16DayDate.getFullYear(),
          month: next16DayDate.getMonth() + 1,
          day: next16DayDate.getUTCDate(),
        }
      : {
          year: next15DayDate.getFullYear(),
          month: next15DayDate.getMonth() + 1,
          day: next15DayDate.getUTCDate(),
        };

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateObj, setSelectedDateObj] = useState(defaultValue);
  const [selectedSlot, setSelectedSlot] = useState();
  const [timeSlots, setTimeSlots] = useState();
  const [slotError, setSlotError] = useState(null);

  const [cart, setCart] = useState([]);
  const [itemsError, setItemsError] = useState(null);
  const [amount, setAmount] = useState(0.0);
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesError, setServicesError] = useState(null);

  const [typeValue, setTypeValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTypeValue(newValue);
  };

  const getFormattedAddress = (index) => {
    let address = '';
    if (addresses[index]) {
      address =
        addresses[index].address1 +
        ', ' +
        addresses[index].address2 +
        ', ' +
        addresses[index].city +
        ', ' +
        addresses[index].state +
        ' ' +
        addresses[index].zipCode;
    }
    return address;
  };

  const steps = ['Address', 'Date', 'Service'];

  useEffect(() => {
    if (props.isLoggedIn === false) {
      navigate('/');
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        if (user && user.addresses && user.addresses.length) {
          let addressesArr = user.addresses;
          addressesArr.sort((a, b) => b.isDefault - a.isDefault);
          addressesArr.forEach((element, index) => {
            if (element.isDefault) {
              setSelectedAddress(index);
            }
          });
          setAddresses(addressesArr);
        }
      }
    }
    setUserLoaded(true);
  }, [navigate, props.isLoggedIn, props.user]);

  useEffect(() => {
    let servicesObj = [];
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      props.services.forEach((service, index) => {
        if (!service.isItem) {
          servicesObj.push({ ...service, units: 0, isExpanded: false });
          servicesObj[index].items = [];
          if (service.items) {
            for (const item of service.items) {
              servicesObj[index].items.push({ ...item, units: 0 });
            }
          }
        } else {
          servicesObj.push({ ...service, units: 0 });
        }
      });
      setServices(servicesObj);
    }
  }, []);

  const calculateAmount = (cart) => {
    let total = 0.0;
    for (const cartItem of cart) {
      total = Number(total + Number(cartItem.currentPrice) * Number(cartItem.units));
    }
    setAmount(Number(total).toFixed(2));
    console.log(total);
  };

  const addToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      console.log('add', index);
      let cartObj = [...cart];
      cartObj[index].units = cartObj[index].units + 1;
      setCart(cartObj);
      calculateAmount(cartObj);
    } else {
      setCart([...cart, { ...item, units: 1 }]);
      calculateAmount([...cart, { ...item, units: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    console.log('remove', index);
    if (index > -1) {
      let cartObj = [...cart];
      if (cartObj[index].units > 1) {
        cartObj[index].units = cartObj[index].units - 1;
        setCart(cartObj);
        calculateAmount(cartObj);
      } else {
        cartObj.splice(index, 1);
        setCart(cartObj);
        calculateAmount(cartObj);
      }
    }
  };

  const refreshUser = () => {
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        props.setUser(user);
      }
    }
    setUserLoaded(true);
  };

  const completeAddress = async () => {
    let isError = false;
    if (isError) {
      return;
    }
    setAddressSelected(true);
    setActiveStep(1);
    onDateSelect(selectedDateObj);
  };

  const completeDelivery = async () => {
    let isError = false;
    if (!selectedSlot) {
      setSlotError('Please select pickup timeslot!');
      setTimeout(() => {
        setSlotError(null);
      }, 3000);
      isError = true;
    }
    if (isError) {
      return;
    }
    setDeliverySelected(true);
    setActiveStep(2);
  };

  const bookOrder = async () => {
    let isError = false;
    if (typeValue === 0 && !cart.length) {
      setItemsError('Please add items to proceed.');
      setTimeout(() => {
        setItemsError(null);
      }, 5000);
      isError = true;
    } else if (typeValue === 0 && amount < 10) {
      setItemsError('Add more items! Minimum order amount is $10');
      setTimeout(() => {
        setItemsError(null);
      }, 5000);
      isError = true;
    } else if (typeValue !== 0 && !selectedServices.length) {
      setServicesError('Select a service, and our agent will finalize your order at pickup');
      setTimeout(() => {
        setServicesError(null);
      }, 5000);
      isError = true;
    }
    if (isError) {
      return;
    }
    if (typeValue == 0) {
      setIsConfirmDialogOpen(true);
    }
  };

  const onDateSelect = (dateObj) => {
    setSelectedSlot();
    let date = moment(
      `${dateObj.day < 10 ? '0' + Number(dateObj.day) : dateObj.day}-${
        dateObj.month < 10 ? '0' + Number(dateObj.month) : dateObj.month
      }-${dateObj.year}`,
      'DD-MM-YYYY'
    );
    date.set('hour', moment().get('hour')).set('minute', moment().get('minute'));
    setSelectedDateObj(dateObj);
    setSelectedDate(date);
    var iscurrentDate = moment(date).isSame(new Date(), 'day');
    if (iscurrentDate) {
      let hour = Number(moment(date).format('HH'));
      let newTimeSlots = [];
      if (hour < 11) {
        newTimeSlots.push({
          code: 'mornning-1',
          title: '9 AM - 12 PM',
        });
      }
      if (hour < 14) {
        newTimeSlots.push({
          code: 'mornning-2',
          title: '12 PM - 3 PM',
        });
      }
      if (hour < 17) {
        newTimeSlots.push({
          code: 'afternoon',
          title: '3 PM - 6 PM',
        });
      }
      if (hour < 21) {
        newTimeSlots.push({
          code: 'evening',
          title: '6 PM - 10 PM',
        });
      }
      setTimeSlots(newTimeSlots);
    } else {
      setTimeSlots([
        {
          code: 'mornning-1',
          title: '9 AM - 12 PM',
        },
        {
          code: 'mornning-2',
          title: '12 PM - 3 PM',
        },
        {
          code: 'afternoon',
          title: '3 PM - 6 PM',
        },
        {
          code: 'evening',
          title: '6 PM - 10 PM',
        },
      ]);
    }
  };

  const selectUnselectService = (id) => {
    let services = [...selectedServices];
    if (services.indexOf(id) > -1) {
      services.splice(services.indexOf(id), 1);
    } else {
      services.push(id);
    }
    setSelectedServices(services);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const orderConfirmed = () => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <Container maxWidth='xlg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Box sx={{ display: { xs: 'inherit', sm: 'flex' }, flexDirection: { xs: 'inherit', sm: 'row' } }}>
          <Box sx={{ width: { xs: '100%', sm: '65%' }, px: { xs: 1, sm: 5 }, mt: 2 }}>
            <Stepper sx={{ pb: 4 }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (label === 'Address') {
                        setActiveStep(0);
                      }
                      if (label === 'Date' && addressSelected) {
                        setActiveStep(1);
                      }
                    }}
                    StepIconComponent={ColorlibStepIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <Box sx={{ px: { xs: 0, sm: 1 } }}>
                {userLoaded && (
                  <>
                    <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 2, pb: 4 }}>
                      {addresses.map((address, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <div
                            style={{
                              position: 'relative',
                              cursor: 'pointer',
                            }}
                            onClick={() => setSelectedAddress(index)}
                          >
                            <Stack
                              direction='column'
                              spacing={1}
                              useFlexGap
                              justifyContent='center'
                              alignItems='start'
                              sx={{
                                borderRadius: '15px',
                                py: 2,
                                pr: 1,
                                border: '2px solid',
                                borderColor: index === selectedAddress ? 'primary.main' : 'hsla(220, 25%, 25%, .3)',
                                boxShadow: 'none',
                                minHeight: '12vh',
                                pl: 2,
                              }}
                            >
                              <Typography sx={{ color: 'text.secondary' }} variant='title'>
                                {address.name}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                {address.address1}, {address.address2}, {address.city}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                {address.state} {address.zipCode}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                                <Phone sx={{ fontSize: 16 }} /> {address.phone}
                              </Typography>
                            </Stack>
                            {index === selectedAddress && (
                              <IconButton
                                className='flex items-center ml-3 px-3 py-1.5'
                                style={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  marginLeft: 'auto',
                                  alignContent: 'flex-end',
                                  zIndex: 30,
                                }}
                              >
                                <CheckCircle sx={{ fontSize: 30 }} />
                              </IconButton>
                            )}
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      sx={{ mb: 2 }}
                      className='primary-contained'
                      onClick={() => navigate('/my-addresses')}
                      variant='contained'
                      startIcon={<AddLocation />}
                    >
                      <Typography className='text-white-imp' component='h6' variant='nav' textAlign='center'>
                        Add Address
                      </Typography>
                    </Button>
                  </>
                )}
                <TextField
                  inputProps={{ type: 'text', readOnly: loading }}
                  id='address-notes'
                  name='address notes'
                  label='Extra Address Details'
                  value={addressNotes}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setAddressNotes(e.target.value);
                  }}
                  variant='standard'
                />
                <Button onClick={completeAddress} sx={{ mt: 4, px: 4 }} variant='contained'>
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography variant='subtitle1'>Next</Typography>
                  )}
                </Button>
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ px: { xs: 0, sm: 5 }, pt: 0, pb: 4 }}>
                <Typography component='h5' variant='h5' sx={{ color: 'text.primary', pb: 4 }}>
                  Select Pick Up Date & TimeSlot
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={6.5} md={6.5}>
                    <Calendar
                      colorPrimary='hsl(205, 100%, 50%)'
                      colorPrimaryLight='hsla(205, 100%, 50%, 0.2)'
                      minimumDate={minimumDate}
                      maximumDate={maximumDate}
                      value={selectedDateObj}
                      onChange={(newValue) => onDateSelect(newValue)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5.5} md={5.5} sx={{}}>
                    {/* <Typography component='subtitle1' variant='h6' sx={{ color: 'text.secondary', pb: 5 }}>
                      TimeSlot
                    </Typography> */}
                    <Box>
                      <Grid container>
                        {timeSlots?.map((item, index) => (
                          <Grid
                            item
                            xs={5.5}
                            sm={5.5}
                            md={5.5}
                            sx={{
                              p: 0.5,
                              border: '1.5px solid',
                              backgroundColor: selectedSlot === item.title ? 'primary.main' : 'actionLite.selected',
                              borderColor: 'primary.main',
                              mt: 2,
                              mx: 0.5,
                              borderRadius: '15px',
                            }}
                            key={index}
                          >
                            <div
                              style={{
                                position: 'relative',
                                cursor: 'pointer',
                              }}
                              onClick={() => setSelectedSlot(item.title)}
                            >
                              <Typography
                                variant='body1'
                                sx={{ color: selectedSlot === item.title ? 'text.white' : 'text.primary' }}
                              >
                                {item.title}
                              </Typography>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <Button onClick={completeDelivery} sx={{ mt: 5, px: 4 }} variant='contained'>
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography variant='subtitle1'>Next</Typography>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={typeValue} onChange={handleChange}>
                    <Tab sx={{ width: '50%' }} icon={<AssignmentTurnedIn />} iconPosition='start' label='Select Items Now' />
                    <Tab sx={{ width: '50%' }} icon={<AssignmentLate />} iconPosition='start' label='Select At PickUp' />
                  </Tabs>
                </Box>
                {servicesLoaded ? (
                  <>
                    {typeValue === 0 ? (
                      <>
                        <Typography sx={{ pt: 4, pb: 1, textAlign: 'start' }} variant='h6' component='h6'>
                          Select exact items for pricing upfront
                        </Typography>
                        {services.map((item, index) => (
                          <Box
                            sx={{
                              backgroundColor: '#ededed',
                              borderRadius: '15px',
                              mt: 5,
                              mx: 1,
                              px: 2,
                            }}
                            key={item.id}
                          >
                            {item.isItem ? (
                              <Box sx={{ pr: 0, pl: 0 }}>
                                <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pb: 2 }}>
                                  <Grid style={{ paddingLeft: 0 }} sx={{ textAlign: 'start' }} item xs={2.5} sm={2} md={2}>
                                    <img className='checkout-icon' src={item.pic2} alt='new' />
                                  </Grid>
                                  <Grid sx={{ textAlign: 'start' }} item xs={5.5} sm={7} md={7}>
                                    <Typography variant='title' component='h6'>
                                      {item.name}
                                    </Typography>
                                    <Typography variant='title' component='h6'>
                                      $ {Number(item.currentPrice).toFixed(2)} / lbs
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    sx={{ pr: { xs: 0.5, sm: 0.5 } }}
                                    style={{ paddingLeft: 0 }}
                                    item
                                    xs={4}
                                    sm={3}
                                    md={3}
                                  >
                                    <Typography
                                      sx={{ mx: { xs: 0, sm: 1 }, textAlign: 'right', color: 'secondary' }}
                                      variant='h6'
                                      component='h5'
                                    >
                                      x {item.units} lbs
                                    </Typography>
                                    <Box
                                      sx={{
                                        width: 'fit-content',
                                        ml: 'auto',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <IconButton
                                        size='small'
                                        sx={{
                                          borderRadius: '5px',
                                          mt: 1,
                                          ml: 1,
                                          backgroundColor: 'grey',
                                          color: 'text.white',
                                        }}
                                        onClick={() => {
                                          if (item.units > 0) {
                                            let itemObj = { ...item };
                                            itemObj.units = itemObj.units - 1;
                                            let servicesObj = [...services];
                                            servicesObj[index] = itemObj;
                                            setServices(servicesObj);
                                            removeFromCart(itemObj);
                                          }
                                        }}
                                      >
                                        <Remove sx={{ fontSize: 25 }} />
                                      </IconButton>
                                      <IconButton
                                        size='small'
                                        sx={{
                                          borderRadius: '5px',
                                          mt: 1,
                                          ml: 1,
                                          backgroundColor: 'primary.main',
                                          color: 'text.white',
                                        }}
                                        onClick={() => {
                                          if (item.units < 10) {
                                            let itemObj = { ...item };
                                            itemObj.units = itemObj.units + 1;
                                            let servicesObj = [...services];
                                            servicesObj[index] = itemObj;
                                            setServices(servicesObj);
                                            addToCart(itemObj);
                                          }
                                        }}
                                      >
                                        <Add sx={{ fontSize: 25 }} />
                                      </IconButton>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            ) : (
                              <Box sx={{ paddingBottom: 2, pr: 0, pl: 0 }}>
                                <Grid
                                  onClick={() => {
                                    let itemObj = { ...item };
                                    itemObj.isExpanded = !itemObj.isExpanded;
                                    let servicesObj = [...services];
                                    servicesObj[index] = itemObj;
                                    setServices(servicesObj);
                                  }}
                                  container
                                  alignItems='center'
                                  justifyContent='center'
                                  spacing={2.5}
                                  sx={{ pb: 2 }}
                                >
                                  <Grid style={{ paddingLeft: 0 }} sx={{ textAlign: 'start' }} item xs={2.5} sm={2} md={2}>
                                    <img className='checkout-icon' src={item.pic2} alt='new' />
                                  </Grid>
                                  <Grid sx={{ textAlign: 'start' }} item xs={5.5} sm={7} md={7}>
                                    <Typography variant='title' component='h6'>
                                      {item.name}
                                    </Typography>
                                  </Grid>
                                  <Grid sx={{ textAlign: 'end' }} item xs={4} sm={3} md={3}>
                                    <IconButton>
                                      {!item.isExpanded && <KeyboardArrowDown sx={{ fontSize: 28 }} />}
                                      {item.isExpanded && <KeyboardArrowUp sx={{ fontSize: 28 }} />}
                                    </IconButton>
                                  </Grid>
                                </Grid>
                                <Box sx={{ pr: 0, pl: 2 }}>
                                  {item.isExpanded &&
                                    item.items &&
                                    item.items.length &&
                                    item.items.map((serviceItem, serviceItemIndex) => (
                                      <Box
                                        key={serviceItemIndex}
                                        sx={{ pl: { xs: 0.5, sm: 2, md: 3 }, pr: { xs: 0, sm: 1.5, md: 2.5 } }}
                                      >
                                        <Grid
                                          key={'item' + serviceItemIndex}
                                          container
                                          alignItems='center'
                                          justifyContent='center'
                                          spacing={2.5}
                                          sx={{ my: 2, py: 1.5, backgroundColor: 'white', borderRadius: '15px' }}
                                        >
                                          <Grid
                                            style={{ paddingTop: 0, paddingLeft: 0 }}
                                            sx={{ textAlign: 'start' }}
                                            item
                                            xs={2.5}
                                            sm={2}
                                            md={2}
                                          >
                                            <img className='checkout-icon-mini' src={serviceItem.pic} alt='new' />
                                          </Grid>
                                          <Grid
                                            style={{ paddingTop: 0 }}
                                            sx={{ textAlign: 'start' }}
                                            item
                                            xs={5}
                                            sm={6}
                                            md={6}
                                          >
                                            <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                                              {serviceItem.name}
                                            </Typography>
                                            <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                                              $ {Number(serviceItem.currentPrice).toFixed(2)}
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            style={{ paddingLeft: 0, paddingTop: 0 }}
                                            sx={{ pr: { xs: 2, sm: 2 } }}
                                            item
                                            xs={4.5}
                                            sm={4}
                                            md={4}
                                          >
                                            <Typography
                                              sx={{
                                                mx: { xs: 0, sm: 1 },
                                                textAlign: 'right',
                                                color: 'secondary',
                                                fontWeight: 'bold',
                                              }}
                                              variant='title'
                                              component='h6'
                                            >
                                              x {serviceItem.units}
                                            </Typography>
                                            <Box
                                              sx={{
                                                width: 'fit-content',
                                                ml: 'auto',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                              }}
                                            >
                                              <IconButton
                                                size='small'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'grey',
                                                  color: 'text.white',
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units > 0) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units - 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    removeFromCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Remove sx={{ fontSize: 20 }} />
                                              </IconButton>
                                              <IconButton
                                                size='small'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'primary.main',
                                                  color: 'text.white',
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units < 10) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units + 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    addToCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Add sx={{ fontSize: 20 }} />
                                              </IconButton>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        <Typography sx={{ pt: 4, pb: 1, textAlign: 'start' }} variant='h6' component='h6'>
                          Select services, and our agent will add items at pickup
                        </Typography>
                        <Grid container alignItems='center' justifyContent='center' spacing={3} sx={{ pt: 4, pb: 4 }}>
                          {services.map((serviceItem, index) => (
                            <Grid item xs={6} sm={4} md={4} key={index}>
                              <Box
                                sx={{
                                  height: '125px',
                                  borderRadius: '15px',
                                  backgroundImage: `url(${serviceItem.pic})`,
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                  backgroundRepeat: 'no-repeat',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '125px',
                                    width: '100%',
                                    borderRadius: '15px',
                                    backgroundColor: 'rgba(0,0,0, 0.70)',
                                  }}
                                >
                                  <div
                                    onClick={() => selectUnselectService(serviceItem.id)}
                                    style={{ height: '125px', position: 'relative', cursor: 'pointer' }}
                                  >
                                    <Typography
                                      component='h6'
                                      sx={{
                                        alignContent: 'center',
                                        color: 'text.primary',
                                        height: '125px',
                                        typography: { md: 'h5', sm: 'h6', xs: 'h6' },
                                        userSelect: 'none',
                                      }}
                                    >
                                      {serviceItem.name}
                                    </Typography>
                                    {selectedServices.indexOf(serviceItem.id) > -1 && (
                                      <IconButton sx={{ position: 'absolute', top: 0, right: 0, marginLeft: 'auto' }}>
                                        <CheckCircle></CheckCircle>
                                      </IconButton>
                                    )}
                                  </div>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  </>
                ) : null}
                <Button onClick={bookOrder} sx={{ mt: 4, px: 4 }} variant='contained'>
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography variant='title'>View & Confirm</Typography>
                  )}
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '30%' }, mt: { xs: 5, sm: 2 }, ml: 'auto', mr: '2.5%' }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '15px' }}>
              <Typography sx={{ py: 2, color: 'text.primary' }} variant='h6' textAlign='center'>
                -- Summary --
              </Typography>
              <ListItem
                sx={{ height: '100px' }}
                secondaryAction={
                  <IconButton onClick={() => setActiveStep(0)} edge='end' aria-label='delete'>
                    <Edit />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    }}
                  >
                    <PersonPin />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Address'
                  secondary={selectedAddress > -1 ? getFormattedAddress(selectedAddress) : ''}
                />
              </ListItem>
              <ListItem
                sx={{ height: '100px' }}
                secondaryAction={
                  <>
                    {addressSelected && (
                      <IconButton onClick={() => setActiveStep(1)} edge='end' aria-label='delete'>
                        <Edit />
                      </IconButton>
                    )}
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    }}
                  >
                    <DateRange />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Date'
                  secondary={
                    (selectedDate ? `${moment(selectedDate).format('ddd DD, MMM YYYY')} ` : '') +
                    (selectedSlot ? `${selectedSlot}` : '')
                  }
                />
              </ListItem>
              <ListItem
                sx={{ height: '100px' }}
                secondaryAction={
                  <>
                    {deliverySelected && (
                      <IconButton onClick={() => setActiveStep(2)} edge='end' aria-label='delete'>
                        <Edit />
                      </IconButton>
                    )}
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    }}
                  >
                    <DryCleaning />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <ListItemText
                    primary='Services'
                    secondary={
                      typeValue === 0
                        ? null
                        : selectedServices
                            .reverse()
                            .map((i) => services[services.findIndex((x) => x.id === i)].name)
                            .join(', ')
                    }
                  />
                </ListItemText>
              </ListItem>
              {typeValue === 0 &&
                cart.map((item, index) => (
                  <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ px: 9, pb: 2 }}>
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
              <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ px: 9, pb: 2 }}>
                <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                  <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }} variant='body1' component='h6'>
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
                    <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }} variant='body1' component='h6'>
                      $ {Number(amount).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </List>
            {activeStep === 2 && (
              <Button onClick={bookOrder} sx={{ mt: 4, px: 4 }} variant='contained'>
                {loading ? (
                  <CircularProgress size={25} color='inherit' />
                ) : (
                  <Typography variant='title'>View & Confirm</Typography>
                )}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Modal
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <ConfirmOrder
            closeModal={closeConfirmDialog}
            orderConfirmed={orderConfirmed}
            address={addresses[selectedAddress]}
            addressNotes={addressNotes}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            cart={cart}
            amount={amount}
            services={services}
            selectedServices={selectedServices}
            typeValue={typeValue}
          ></ConfirmOrder>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!slotError}
        message={slotError}
        key={'bottomcenter'}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!itemsError}
        message={itemsError}
        key={'bottomcenter'}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!servicesError}
        message={servicesError}
        key={'bottomcenter'}
      />
    </Container>
  );
}

export default BookOrder;
