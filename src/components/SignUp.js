import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Box,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { getError, post } from '../utils/api_base';
import { Link, useNavigate } from 'react-router-dom';
import { AddLocation, Edit, Mail, Person, Phone } from '@mui/icons-material';
import AddressPicker from '../Modals/AddressPicker';

export function matchIsNumeric(text) {
  const isNumber = typeof text === 'number';
  const isString = typeof text === 'string';
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

export default function SignUp(props) {
  const navigate = useNavigate();
  const otpRef = useRef();

  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);

  const [isVerified, setIsVerified] = useState(false);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(null);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [address, setAddress] = useState(null);
  const [isAddressAdded, setIsAddressAdded] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [apiError, setApiError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  useEffect(() => {
    props.setIsLoggedIn(false);
    let res = localStorage.getItem('user');
    const user = JSON.parse(res);
    if (user && user.name && user.addresses && user.addresses.length) {
      navigate('/');
      props.setIsLoggedIn(true);
    } else if (user && (!user.name || !user.addresses || !user.addresses.length)) {
      navigate('/signup');
    }
  }, []);

  const sendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      setMobileError('Invalid Mobile Number');
      setTimeout(() => {
        setMobileError(null);
      }, 3000);
      return;
    }
    setLoading(true);
    try {
      let user = await post('users/sendOtp', {
        phone: mobile,
      });
      setLoading(false);
      if (user) {
        if (user.isValidated) {
          setIsVerified(true);
        }
        setOtpSent(true);
      } else {
        setApiError(getError(''));
        setTimeout(() => {
          setApiError(null);
        }, 2500);
      }
    } catch (err) {
      setApiError(getError(err));
      setTimeout(() => {
        setApiError(null);
      }, 2500);
      setLoading(false);
    }
  };

  const signUp = async (code) => {
    if (!code) {
      code = otp;
    }
    let isError = false;
    if (!code || code.length !== 4) {
      setOtpError('Invalid OTP');
      setTimeout(() => {
        setOtpError(null);
      }, 2500);
      isError = true;
    }
    if (!isVerified) {
      if (!name || name.length < 3) {
        setNameError('Invalid Name');
        setTimeout(() => {
          setNameError(null);
        }, 2500);
        isError = true;
      }
      if (!email || email.length < 8) {
        setEmailError('Invalid Email');
        setTimeout(() => {
          setEmailError(null);
        }, 2500);
        isError = true;
      }
      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        setEmailError('Invalid Email');
        setTimeout(() => {
          setEmailError(null);
        }, 2500);
        isError = true;
      }
      if (isError) {
        return;
      }
      if (!isAddressAdded) {
        setAddressError('Address is Required');
        setTimeout(() => {
          setAddressError(null);
        }, 2500);
        isError = true;
      }
    }
    if (isError) {
      return;
    }
    setLoading(true);
    let userObj = {
      phone: mobile,
      otp: code,
    };
    if (!isVerified) {
      userObj.name = name;
      userObj.email = email;
      userObj.addresses = [address];
    }
    try {
      let user = await post('users/confirm', userObj);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        props.setIsLoggedIn(true);
        props.setUser(user);
        navigate('/');
      } else {
        setApiError(getError(''));
        setTimeout(() => {
          setApiError(null);
        }, 2500);
      }
      setLoading(false);
    } catch (err) {
      if (err === 'OTP_INVALID') {
        setOtp('');
        setOtpError('Invalid OTP');
        if (
          otpRef.current &&
          otpRef.current.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild.firstChild &&
          otpRef.current.firstElementChild.firstElementChild.firstChild.focus
        ) {
          otpRef.current.firstElementChild.firstElementChild.firstChild.focus();
        }
      } else {
        setApiError(getError(err));
        setTimeout(() => {
          setApiError(null);
        }, 2500);
      }
      setLoading(false);
    }
  };

  const resendOtp = () => {
    console.log('resendOtp');
  };

  const openAddressDialog = () => {
    setTimeout(() => {
      setIsAddressDialogOpen(true);
    });
  };

  const addAddress = (address) => {
    setAddress(address);
    setIsAddressAdded(true);
  };

  const closeAddressDialog = (id) => {
    setIsAddressDialogOpen(false);
  };

  return (
    <Container maxWidth='lg' id='features' sx={{ margin: 'auto', pt: { xs: 12, sm: 16 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Typography component='h4' variant='h4' sx={{ color: 'text.primary' }}>
          Login / SignUp
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          margin: 'auto',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <TextField
          inputProps={{ type: 'tel', readOnly: otpSent || loading }}
          id='phone'
          name='phone'
          label='Phone'
          value={mobile}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Phone />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          variant='standard'
        />
        {mobileError ? <FormHelperText error>{mobileError}</FormHelperText> : null}
      </Box>
      {otpSent && (
        <>
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              margin: 'auto',
              display: 'flex',
              textAlign: 'start',
            }}
          >
            <InputLabel shrink={true} htmlFor='otp'>
              <Typography>OTP</Typography>
            </InputLabel>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              margin: 'auto',
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              pb: 3,
            }}
          >
            <MuiOtpInput
              ref={otpRef}
              TextFieldsProps={{ type: 'tel', name: 'otp', disabled: loading, placeholder: '-' }}
              validateChar={validateChar}
              className='w-full'
              value={otp}
              autoFocus
              sx={{ gap: 3 }}
              onChange={handleChange}
              onComplete={(value) => {
                setOtp(value);
                if (isVerified) {
                  signUp(value);
                }
              }}
              length={4}
            />
          </Box>
          {otpError ? (
            <Box
              sx={{
                width: { xs: '100%', sm: '50%' },
                margin: 'auto',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                pb: 1,
              }}
            >
              <FormHelperText error>{otpError}</FormHelperText>
            </Box>
          ) : null}
          {!isVerified && (
            <>
              <Box
                sx={{
                  width: { xs: '100%', sm: '50%' },
                  margin: 'auto',
                  textAlign: 'center',
                  pb: 3,
                }}
              >
                <TextField
                  inputProps={{ type: 'text', readOnly: loading }}
                  id='name'
                  name='name'
                  label='Name'
                  value={name}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  variant='standard'
                />
                {nameError ? <FormHelperText error>{nameError}</FormHelperText> : null}
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', sm: '50%' },
                  margin: 'auto',
                  textAlign: 'center',
                  pb: 3,
                }}
              >
                <TextField
                  inputProps={{ type: 'email', readOnly: loading }}
                  id='email'
                  name='email'
                  label='Email'
                  value={email}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Mail />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  variant='standard'
                />
                {emailError ? <FormHelperText error>{emailError}</FormHelperText> : null}
              </Box>
              {!isAddressAdded ? (
                <Box
                  sx={{
                    width: { xs: '100%', sm: '50%' },
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <Button onClick={openAddressDialog} variant='contained' startIcon={<AddLocation />}>
                    Add Address
                  </Button>
                </Box>
              ) : (
                <Box
                  alignItems={'center'}
                  sx={{
                    width: { xs: '100%', sm: '50%' },
                    margin: 'auto',
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: '15px',
                    boxShadow: 0,
                    p: 4,
                    position: 'relative',
                  }}
                >
                  <IconButton
                    onClick={() => openAddressDialog()}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 999,
                    }}
                    aria-label='delete'
                    size='large'
                  >
                    <Edit sx={{ fontSize: 20 }} />
                  </IconButton>
                  <Box
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography className='font-bold'>
                      {address.address1}, {address.address2}
                    </Typography>
                    <Typography className='font-bold'>
                      {address.city}, {address.state} {address.zipCode}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              margin: 'auto',
              display: 'flex',
              pb: 3,
            }}
          >
            <Grid container>
              <Grid item xs>
                <Button disabled={loading} onClick={resendOtp} type='submit' variant='text' sx={{ mt: 2 }}>
                  Resend OTP
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={loading} onClick={() => setOtpSent(false)} type='submit' variant='text' sx={{ mt: 2 }}>
                  Change Phone Number
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <div className='text-center pt-1'>
        {otpSent ? (
          <Button
            onClick={() => signUp(null)}
            disabled={loading}
            type='submit'
            variant='contained'
            sx={{ mt: 2, width: { xs: '75%', sm: '25%' } }}
          >
            {loading ? <CircularProgress size={25} color='inherit' /> : isVerified ? 'Login' : 'SignUp'}
          </Button>
        ) : (
          <Button
            onClick={sendOtp}
            disabled={loading}
            type='submit'
            variant='contained'
            sx={{ mt: 2, width: { xs: '75%', sm: '25%' } }}
          >
            {loading ? <CircularProgress size={25} color='inherit' /> : 'Send OTP'}
          </Button>
        )}
      </div>
      <Modal
        open={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <AddressPicker closeModal={closeAddressDialog} addAddress={addAddress}></AddressPicker>
        </div>
      </Modal>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={!!addressError}
          message={addressError}
          severity='error'
          key={'bottomcenter'}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={!!apiError}
          message={apiError}
          severity='error'
          key={'bottomcenterapi'}
        />
      </Box>
    </Container>
  );
}
