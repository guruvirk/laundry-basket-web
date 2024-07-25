import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Box,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { confirmOtp, sendOtpPost } from '../utils/api_base';
import { Link, useNavigate } from 'react-router-dom';
import { Phone } from '@mui/icons-material';

export function matchIsNumeric(text) {
  const isNumber = typeof text === 'number';
  const isString = typeof text === 'string';
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

export default function Login(props) {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const sendOtp = async () => {
    if (!mobile || mobile.length != 10) {
      setMobileError('Invalid Mobile Number');
      setTimeout(() => {
        setMobileError(null);
      }, 3000);
      return;
    }
    setLoading(true);
    let user = await sendOtpPost({
      phone: mobile,
    });
    setLoading(false);
    if (user) {
      setOtpSent(true);
    }
  };

  const login = async (code) => {
    if (!code || code.length != 4) {
      setOtpError('Invalid OTP');
      setTimeout(() => {
        setOtpError(null);
      }, 3000);
      return;
    }
    setLoading(true);
    let user = await confirmOtp({
      phone: mobile,
      otp: code,
    });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user?.session?.token);
      if (user.name && user.addresses && user.addresses.length) {
        navigate('/');
        props.setUser(user);
        props.setIsLoggedIn(true);
      } else {
        navigate('/signup');
      }
      setOtp('');
      setOtpSent(false);
    } else {
      setOtpError('Invalid OTP');
    }
    setLoading(false);
  };

  const resendOtp = () => {
    console.log('resendOtp');
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
          Login
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
              textAlign: 'center',
              justifyContent: 'center',
              pb: 1,
            }}
          >
            <MuiOtpInput
              TextFieldsProps={{ type: 'tel' }}
              validateChar={validateChar}
              className='w-full'
              value={otp}
              autoFocus
              sx={{ gap: 3 }}
              onChange={handleChange}
              onComplete={(value) => {
                setOtp(value);
                login(value);
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
            onClick={login}
            disabled={loading}
            type='submit'
            variant='contained'
            sx={{ mt: 2, width: { xs: '75%', sm: '25%' } }}
          >
            {loading ? <CircularProgress size={25} color='inherit' /> : 'Login'}
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
    </Container>
  );
}
