import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Delete, Edit, Mail, Person, Phone } from '@mui/icons-material';
import { updateUser } from '../utils/api_base';

function Profile(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);
  const [name, setName] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const deleteImage = () => {
    if (image) {
      setImage();
      setImageUrl();
    } else {
      setUser({ ...user, pic: null });
    }
  };

  useEffect(() => {
    if (props.isLoggedIn === false) {
      navigate('/');
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        setEmail(user.email);
        setName(user.name);
        setMobile(user.phone);
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
        setEmail(user.email);
        setName(user.name);
        setMobile(user.phone);
        props.setUser(user);
      }
    }
    setUserLoaded(true);
  };

  const update = async () => {
    let isError = false;
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
    var formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    if (!image && !user.pic) {
      formData.append('pic', 'delete');
    }
    formData.append('name', name);
    formData.append('email', email);
    setLoading(true);
    let userResp = await updateUser(user.id, formData);
    if (userResp) {
      localStorage.setItem('user', JSON.stringify(userResp));
      refreshUser();
    }
    setLoading(false);
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
          My Profile
        </Typography>

        {userLoaded && (
          <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 6, pb: 4 }}>
            <Grid item xs={12} sm={9} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 'auto',
                  width: 'fit-content',
                }}
              >
                <Avatar
                  sx={{ backgroundColor: 'primary.main', color: 'white', width: 120, height: 120 }}
                  alt='username'
                  src={imageUrl || user.pic}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Box
                  sx={{
                    display: 'grid',
                    marginLeft: 4,
                  }}
                >
                  <Button
                    variant='contained'
                    size='medium'
                    sx={{ marginBottom: 1, p: 1, fontSize: { xs: 16, sm: 20, md: 18 } }}
                    startIcon={<Edit sx={{ fontSize: { xs: 16, sm: 20, md: 18 } }} />}
                    component='label'
                    disabled={loading}
                  >
                    Change Pic
                    <input type='file' hidden accept='image/*' onChange={onImageChange} />
                  </Button>
                  <Button
                    onClick={deleteImage}
                    variant='contained'
                    disabled={loading}
                    size='medium'
                    sx={{ marginBottom: 1, p: 1, fontSize: { xs: 16, sm: 20, md: 18 } }}
                    startIcon={<Delete sx={{ fontSize: { xs: 16, sm: 20, md: 18 } }} />}
                  >
                    Delete Pic{'  '}
                  </Button>
                </Box>
              </Box>
              <TextField
                sx={{ mt: 3 }}
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
              <TextField
                sx={{ mt: 3 }}
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
              <TextField
                sx={{ mt: 3 }}
                inputProps={{ type: 'tel', readOnly: true || loading }}
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
              <Button onClick={update} sx={{ mt: 4 }} variant='contained'>
                {loading ? <CircularProgress size={25} color='inherit' /> : 'Update'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Profile;
