import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Container, FormHelperText, InputAdornment, TextField, Typography } from '@mui/material';
import { confirmOtp, sendOtpPost } from '../utils/api_base';
import { useNavigate } from 'react-router-dom';
import { Phone } from '@mui/icons-material';

export default function Login(props) {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [mobileError, setMobileError] = useState(null);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(null);
  const [preRegistered, setPreRegistered] = useState(false);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    let user = await confirmOtp({
      phone: mobile,
      otp: code,
    });
    if (user) {
      if (user.name && user.addresses && user.addresses.length) {
        navigate('');
      }
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
          width: { xs: '100%', sm: '33%' },
          margin: 'auto',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <TextField
          inputProps={{ type: 'number', readOnly: otpSent }}
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
        <Box
          sx={{
            width: { xs: '100%', sm: '33%' },
            margin: 'auto',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            pb: 4,
          }}
        >
          <MuiOtpInput
            TextFieldsProps={{ size: 'small', placeholder: '-' }}
            className='justify-center w-full'
            sx={{ gap: 3 }}
            length={4}
          />
          {otpError ? <FormHelperText error>{otpError}</FormHelperText> : null}
        </Box>
      )}
      <div className='text-center pt-1'>
        {otpSent ? (
          <Button onClick={login} type='submit' variant='contained' sx={{ mt: 2, width: { xs: '75%', sm: '25%' } }}>
            Login
          </Button>
        ) : (
          <Button onClick={sendOtp} type='submit' variant='contained' sx={{ mt: 2, width: { xs: '75%', sm: '25%' } }}>
            Send OTP
          </Button>
        )}
      </div>
    </Container>
  );
}
