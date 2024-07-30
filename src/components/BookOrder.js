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
  Select,
  Stack,
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
import { CheckCircle, DateRange, DryCleaning, Edit, LocationOn, PersonPin } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

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

  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [timeSlots, setTimeSlots] = useState();

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

  const getMonthYear = (date) => {
    return moment(date).format('MMMM YYYY');
  };

  const getDay = (date) => {
    return moment(date).format('ddd');
  };

  const getDate = (date) => {
    return moment(date).format('DD');
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
        <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 6, pb: 4 }}>
          <Grid item xs={12} sm={8} md={7}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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
                  <InputLabel sx={{
                    color: Boolean(selectedDate) ? '#0095ff': ''
                  }} shrink={Boolean(selectedDate)} id='slot-select-label'>
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
                          onKeyDown: ((e) => {
                            e.preventDefault();
                          }),
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
                    onChange={() => {}}
                  >
                    {timeSlots?.map((item, index) => (
                      <MenuItem value={index}>{item.title}</MenuItem>
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
                <Button onClick={bookOrder} sx={{ mt: 4, px: 4 }} variant='contained'>
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography variant='subtitle1'>Next</Typography>
                  )}
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
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
                <ListItemText primary='Date' secondary='' />
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
                <ListItemText primary='Service' secondary='' />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default BookOrder;
