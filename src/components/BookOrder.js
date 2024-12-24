import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
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
  Remove,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import ConfirmOrder from '../Modals/ConfirmOrder';

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
  const [delivery, setDelivery] = useState('standard');

  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [timeSlots, setTimeSlots] = useState();

  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0.0);
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);

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
          user.addresses.forEach((element, index) => {
            if (element.isDefault) {
              setSelectedAddress(index);
            }
          });
          setAddresses(user.addresses);
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
  };

  const completeDelivery = async () => {
    let isError = false;
    if (isError) {
      return;
    }
    setDeliverySelected(true);
    setActiveStep(2);
  };

  const bookOrder = async () => {
    let isError = false;
    if (isError) {
      return;
    }
    if (typeValue == 0) {
      setIsConfirmDialogOpen(true);
    }
  };

  const onDateSelect = (date) => {
    setSelectedDate(date);
    var iscurrentDate = moment(date).isSame(new Date(), 'day');
    if (iscurrentDate) {
      let hour = Number(moment(date).format('HH'));
      let newTimeSlots = [];
      if (hour < 10) {
        newTimeSlots.push({
          code: 'mornning-1',
          title: '8 AM - 10 AM',
        });
      }
      if (hour < 12) {
        newTimeSlots.push({
          code: 'mornning-2',
          title: '10 PM - 12 PM',
        });
      }
      if (hour < 17) {
        newTimeSlots.push({
          code: 'afternoon',
          title: '2 PM - 5 PM',
        });
      }
      if (hour < 19) {
        newTimeSlots.push({
          code: 'evening-1',
          title: '5 PM - 7 PM',
        });
      }
      if (hour < 22) {
        newTimeSlots.push({
          code: 'evening-2',
          title: '7 PM - 10 PM',
        });
      }
      setTimeSlots(newTimeSlots);
    } else {
      setTimeSlots([
        {
          code: 'mornning-1',
          title: '8 AM - 10 AM',
        },
        {
          code: 'mornning-2',
          title: '10 PM - 12 PM',
        },
        {
          code: 'afternoon',
          title: '2 PM - 5 PM',
        },
        {
          code: 'evening-1',
          title: '5 PM - 7 PM',
        },
        {
          code: 'evening-2',
          title: '7 PM - 10 PM',
        },
      ]);
    }
  };

  const selectUnselectService = (code) => {
    let services = [...selectedServices];
    if (services.indexOf(code) > -1) {
      services.splice(services.indexOf(code), 1);
    } else {
      services.push(code);
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
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Stepper sx={{ pb: 4 }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: { xs: 'inherit', sm: 'flex' }, flexDirection: { xs: 'inherit', sm: 'row' } }}>
          <Box sx={{ width: { xs: '100%', sm: '65%' }, px: { xs: 1, sm: 5 } }}>
            {activeStep === 0 && (
              <Box sx={{ px: { xs: 0, sm: 1 } }}>
                <Typography sx={{ pt: 3, color: 'text.primary' }} component='h6' variant='h6' textAlign='center'>
                  Select Address
                </Typography>
                {userLoaded && (
                  <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 4, pb: 4 }}>
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
                            sx={{
                              borderRadius: '15px',
                              py: 4,
                              px: 2,
                              border: '1px solid',
                              borderColor: 'hsla(220, 25%, 25%, .3)',
                              boxShadow: 'none',
                            }}
                          >
                            <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                              {address.address1}, {address.address2}{' '}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                              {address.city}, {address.state}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                              {address.zipCode}
                            </Typography>
                          </Stack>
                          {index === selectedAddress && (
                            <IconButton
                              className='flex items-center ml-3 px-3 py-1.5'
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
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
                <Grid
                  sx={{ textAlign: 'start', alignItems: 'center', display: 'flex', flexDirection: 'row', mt: 2 }}
                  item
                  xs={10}
                  sm={10}
                  md={10}
                >
                  <Typography sx={{ marginRight: 2 }} variant='subtitle1'>
                    Delivey Type:{' '}
                  </Typography>
                  <RadioGroup
                    sx={{ alignItems: 'start' }}
                    row
                    value={delivery}
                    onChange={(event) => setDelivery(event.target.value)}
                  >
                    <FormControlLabel
                      value='standard'
                      control={<Radio sx={{ padding: 0, marginX: 1 }} />}
                      label='Standard'
                    />
                    <FormControlLabel value='express' control={<Radio sx={{ padding: 0, marginX: 1 }} />} label='Express' />
                  </RadioGroup>
                </Grid>
                {delivery === 'standard' ? (
                  <Typography sx={{ color: 'text.secondary', marginRight: 2, textAlign: 'left' }} variant='body2'>
                    Note: Free Standard delivery worth $5 on order above $20.
                  </Typography>
                ) : (
                  <Typography sx={{ color: 'text.secondary', marginRight: 2, textAlign: 'left' }} variant='body2'>
                    Note: Express delivery worth $10 would be only $5 on order above $20.
                  </Typography>
                )}
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
              <Box sx={{ px: { xs: 0, sm: 1 }, pt: 4, pb: 4 }}>
                <FormControl sx={{ py: Boolean(selectedDate) ? 0 : 2 }} fullWidth>
                  <InputLabel
                    sx={{
                      color: Boolean(selectedDate) ? '#0095ff' : '',
                    }}
                    shrink={Boolean(selectedDate)}
                    id='slot-select-label'
                  >
                    Select Pick Up TimeSlot
                  </InputLabel>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <FormControl fullWidth>
                    <DatePicker
                      value={selectedDate}
                      onChange={(newValue) => onDateSelect(newValue)}
                      label={''}
                      format={Boolean(selectedDate) ? 'ddd, MMM DD YYYY' : 'DD/MM/YYYY'}
                      maxDate={moment().add(15, 'day')}
                      minDate={Number(moment().format('HH')) > 21 ? moment().add(1, 'day') : moment()}
                      sx={{ width: '100%' }}
                      slotProps={{
                        textField: {
                          onKeyDown: (e) => {
                            e.preventDefault();
                          },
                          inputProps: {
                            sx: {
                              textAlign: 'center',
                            },
                          },
                          variant: 'standard',
                        },
                        day: {
                          sx: {
                            '&.MuiPickersDay-root.Mui-selected': {
                              color: 'white',
                            },
                          },
                        },
                      }}
                      inputRef={dateInputRef}
                    />
                  </FormControl>
                </LocalizationProvider>
                <FormControl disabled={!selectedDate} fullWidth sx={{ my: 4 }}>
                  <InputLabel id='slot-select-label'>Select Pick Up TimeSlot</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    variant='standard'
                    value={selectedSlot}
                    label='Age'
                    onChange={(event) => {
                      setSelectedSlot(event.target.value);
                    }}
                  >
                    {timeSlots?.map((item, index) => (
                      <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={completeDelivery} sx={{ mt: 4, px: 4 }} variant='contained'>
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography variant='subtitle1'>Next</Typography>
                  )}
                </Button>
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
                        {services.map((item, index) => (
                          <Box key={item.id}>
                            {item.isItem ? (
                              <Grid
                                container
                                alignItems='center'
                                justifyContent='center'
                                spacing={2.5}
                                sx={{ py: 2, px: 4, borderBottomWidth: 1 }}
                              >
                                <Grid sx={{ textAlign: 'start' }} item xs={7} sm={8} md={8}>
                                  <Typography variant='subtitle2' component='h6'>
                                    {item.name} ($ {Number(item.currentPrice).toFixed(2)} / lbs)
                                  </Typography>
                                </Grid>
                                <Grid item xs={5} sm={4} md={4}>
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
                                      <Add sx={{ fontSize: 28 }} />
                                    </IconButton>
                                    <Typography sx={{ mx: { xs: 0, sm: 1 } }} variant='h6' component='h5'>
                                      {item.units}
                                    </Typography>
                                    <IconButton
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
                                      <Remove sx={{ fontSize: 28 }} />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            ) : (
                              <>
                                <Grid
                                  container
                                  alignItems='center'
                                  justifyContent='center'
                                  spacing={2.5}
                                  sx={{ py: 2, px: 4, borderBottomWidth: 1 }}
                                >
                                  <Grid sx={{ textAlign: 'start' }} item xs={7} sm={8} md={8}>
                                    <Typography variant='subtitle2' component='h6'>
                                      {item.name}
                                    </Typography>
                                  </Grid>
                                  <Grid sx={{ textAlign: 'end' }} item xs={5} sm={4} md={4}>
                                    <IconButton
                                      onClick={() => {
                                        let itemObj = { ...item };
                                        itemObj.isExpanded = !itemObj.isExpanded;
                                        let servicesObj = [...services];
                                        servicesObj[index] = itemObj;
                                        setServices(servicesObj);
                                      }}
                                    >
                                      {!item.isExpanded && <KeyboardArrowDown sx={{ fontSize: 28 }} />}
                                      {item.isExpanded && <KeyboardArrowUp sx={{ fontSize: 28 }} />}
                                    </IconButton>
                                  </Grid>
                                </Grid>
                                {item.isExpanded &&
                                  item.items &&
                                  item.items.length &&
                                  item.items.map((serviceItem, serviceItemIndex) => (
                                    <Box sx={{ px: 5 }}>
                                      <Grid
                                        key={'item' + serviceItemIndex}
                                        container
                                        alignItems='center'
                                        justifyContent='center'
                                        spacing={2.5}
                                        sx={{ py: 2, borderBottomWidth: 1 }}
                                      >
                                        <Grid item xs={7} sm={7} md={7}>
                                          <Box
                                            sx={{
                                              width: '100%',
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <Typography variant='body1' component='h6'>
                                              {serviceItem.name} ($ {Number(serviceItem.currentPrice).toFixed(2)})
                                            </Typography>
                                          </Box>
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
                                            <IconButton
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
                                              <Add sx={{ fontSize: 24 }} />
                                            </IconButton>
                                            <Typography sx={{ mx: { xs: 0, sm: 0.5 } }} variant='subtitle2' component='h5'>
                                              {serviceItem.units}
                                            </Typography>
                                            <IconButton
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
                                              <Remove sx={{ fontSize: 24 }} />
                                            </IconButton>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  ))}
                              </>
                            )}
                          </Box>
                        ))}
                      </>
                    ) : (
                      <Box
                        className='services-book'
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          overflowX: 'scroll',
                          overflowY: 'hidden',
                          py: 2,
                        }}
                      >
                        {services.map((item, index) => (
                          <Paper
                            key={'services-' + index}
                            sx={{
                              mt: 4,
                              mx: 1,
                              height: '125px',
                              borderRadius: '15px',
                              backgroundImage: `url(${item.pic})`,
                              width: '125px',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                          >
                            <Box
                              sx={{
                                height: '125px',
                                width: '125px',
                                borderRadius: '15px',
                                backgroundColor: 'rgba(0,0,0, 0.70)',
                              }}
                            >
                              <div
                                onClick={() => selectUnselectService(item.id)}
                                style={{ height: '125px', width: '125px', position: 'relative', cursor: 'pointer' }}
                              >
                                <Typography
                                  component='h6'
                                  sx={{
                                    alignContent: 'center',
                                    color: 'text.primary',
                                    height: '125px',
                                    width: '125px',
                                    typography: { sm: 'subtitle1', xs: 'subtitle1' },
                                    userSelect: 'none',
                                  }}
                                >
                                  {item.name}
                                </Typography>
                                {selectedServices.indexOf(item.id) > -1 && (
                                  <IconButton sx={{ position: 'absolute', top: 0, right: 0, marginLeft: 'auto' }}>
                                    <CheckCircle></CheckCircle>
                                  </IconButton>
                                )}
                              </div>
                            </Box>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </>
                ) : null}
                <Button onClick={bookOrder} sx={{ mt: 4, px: 4 }} variant='contained'>
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography variant='subtitle1'>Confirm Order</Typography>
                  )}
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '35%' }, mt: { xs: 5 } }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '15px' }}>
              <Typography sx={{ py: 2, color: 'text.primary' }} variant='h6' textAlign='center'>
                Summary
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
                        ? `Total: ${Number(amount).toFixed(2)}`
                        : services
                            .filter((i) => selectedServices.indexOf(i.id) > -1)
                            .map((i) => i.name)
                            .join(', ')
                    }
                  />
                </ListItemText>
              </ListItem>
            </List>
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
            delivery={delivery}
          ></ConfirmOrder>
        </div>
      </Modal>
    </Container>
  );
}

export default BookOrder;
