import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { updateUser } from '../utils/api_base';
import { CloseRounded, Home, LocationCity, LocationOn, Map, Person, Phone, Signpost } from '@mui/icons-material';
import GooglePlacesInput from '../shared/GooglePlacesInput';

const modalStyle = {
  position: 'absolute',
  width: { xs: '90%', sm: '45%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  px: 4,
  py: 2,
};

export default function AddressPicker(props) {
  const googleRef = useRef();
  const address1Ref = useRef();

  const [isgoogleEditable, setGoogleEditable] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressId, setAddressId] = useState(null);
  const [userId, setUserId] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [isDefaultError, setIsDefaultError] = useState(null);
  const [isDefaultOtherExists, setIsDefaultOtherExists] = useState(false);
  const [address1, setAddres1] = useState('');
  const [address1Error, setAddres1Error] = useState(null);
  const [address2, setAddres2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address2Error, setAddres2Error] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [addressString, setAddressString] = useState(null);
  const [country, setCountry] = useState('Canada');
  const [location, setLocation] = useState({
    coords: {
      latitude: '43.712340',
      longitude: '-79.271010',
    },
  });

  const getFormattedAddress = (place) => {
    let location_obj = {
      formatted_address: '',
      locality: '',
      street_number: '',
      admin_area_l1: '',
      route: '',
      country: '',
      sublocality: '',
      postal_code: '',
    };
    for (let i in place.address_components) {
      let item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address || place.name;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['long_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['long_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['long_name'];
      } else if (item['types'].indexOf('sublocality') > -1) {
        location_obj['sublocality'] = item['long_name'];
      }
    }

    return location_obj;
  };

  const getFormattedLocationAddress = (results) => {
    let location_obj = {
      formatted_address: '',
      locality: '',
      street_number: '',
      admin_area_l1: '',
      route: '',
      country: '',
      sublocality: '',
      postal_code: '',
    };
    let data;
    if (results.length) {
      data = results[0];
    }
    for (let i in data.address_components) {
      let item = data.address_components[i];

      location_obj['formatted_address'] = data.formatted_address || data.name;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['long_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['long_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['long_name'];
      } else if (item['types'].indexOf('sublocality') > -1) {
        location_obj['sublocality'] = item['long_name'];
      }
    }

    return location_obj;
  };

  const setLocationAddress = (details) => {
    let address = getFormattedLocationAddress(details);
    if (address.formatted_address) {
      setGoogleEditable(false);
      setTimeout(() => {
        if (googleRef.current) {
          googleRef.current.updateAddress(address.formatted_address);
          if (address1Ref.current) {
            address1Ref.current.focus();
          }
        }
      });
    }
    setAddressString(address.formatted_address);
    if (address.street_number && address.street_number.trim()) {
      setAddres2(address.street_number + (address.route.trim() ? ', ' + address.route : ''));
    } else {
      setAddres2(address.route);
    }
    setCity(address.sublocality || address.locality);
    setState(address.admin_area_l1);
    setZipCode(address.postal_code);
    setCountry(address.country);
    setIsLoading(false);
  };

  const setAddress = (details) => {
    let address = getFormattedAddress(details);
    setAddressString(address.formatted_address);
    if (address.street_number && address.street_number.trim()) {
      setAddres2(address.street_number + (address.route.trim() ? ', ' + address.route : ''));
    } else {
      setAddres2(address.route);
    }
    setCity(address.sublocality || address.locality);
    setState(address.admin_area_l1);
    setZipCode(address.postal_code);
    setCountry(address.country);
    if (address1Ref.current) {
      address1Ref.current.focus();
    }
  };

  useEffect(() => {
    setIsDefaultOtherExists(false);
    if (props.addressId || props.addressId === 0) {
      setAddressId(props.addressId);
      let res = localStorage.getItem('user');
      if (res) {
        const user = JSON.parse(res);
        setUserId(user.id);
        let addressesArr = props.addresses || user.addresses;
        if (addressesArr && addressesArr.length) {
          setAddresses(addressesArr);
          setName(addressesArr[props.addressId].name || props.user.name);
          setPhone(addressesArr[props.addressId].phone || props.user.phone);
          setZipCode(addressesArr[props.addressId].zipCode);
          setState(addressesArr[props.addressId].state);
          setCity(addressesArr[props.addressId].city);
          setAddres1(addressesArr[props.addressId].address1);
          setAddres2(addressesArr[props.addressId].address2);
          setCountry(addressesArr[props.addressId].country);
          setAddressString(addressesArr[props.addressId].addressString);
          if (addressesArr[props.addressId].addressString) {
            setTimeout(() => {
              googleRef.current.updateAddress(addressesArr[props.addressId].addressString);
            });
          }
          setIsDefault(addressesArr[props.addressId].isDefault || false);
          addressesArr.forEach((element, index) => {
            if (index !== props.addressId) {
              if (element.isDefault) {
                setIsDefaultOtherExists(true);
              }
            }
          });
        }
      }
    } else {
      setName(props.user.name || '');
      setPhone(props.user.phone || '');
      if (props.canUpdate) {
        let res = localStorage.getItem('user');
        if (res) {
          const user = JSON.parse(res);
          setUserId(user.id);
          let addressesArr = props.addresses || user.addresses;
          if (addressesArr && addressesArr.length) {
            setAddresses(addressesArr);
            addressesArr.forEach((element, index) => {
              if (index !== props.addressId) {
                if (element.isDefault) {
                  setIsDefaultOtherExists(true);
                }
              }
            });
          }
        }
      }
      setIsLoading(true);
      setTimeout(() => {
        (async () => {
          setIsLoading(true);
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (locationData) {
              console.log(locationData);
              if (location && location.coords) {
                axios
                  .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCO9AFZPIDwfLkoaPV36NNewB5MfwwYDX4`
                  )
                  .then((response) => {
                    if (response.data && response.data.results) {
                      setLocationAddress(response.data.results);
                    }
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    console.error(error);
                  });
              } else {
                setIsLoading(false);
              }
            });
          } else {
            setIsLoading(false);
            console.log('Geolocation is not available in your browser.');
          }
        })();
        setIsLoading(false);
      }, 2500);
      if (!props.canUpdate) {
        if (props.address) {
          setName(props.address.name || props.user.name);
          setPhone(props.address.phone || props.user.phone);
          setZipCode(props.address.zipCode);
          setState(props.address.state);
          setCity(props.address.city);
          setAddres1(props.address.address1);
          setAddres2(props.address.address2);
          setCountry(props.address.country);
          setAddressString(props.address.addressString);
          if (props.address.addressString) {
            setTimeout(() => {
              googleRef.current.updateAddress(props.address.addressString);
            });
          }
          setIsDefault(props.address.isDefault || false);
        }
        if (props.addresses) {
          props.addresses.forEach((element, index) => {
            if (element.addressString !== props.address.addressString) {
              if (element.isDefault) {
                setIsDefaultOtherExists(true);
              }
            }
          });
        } else {
          setIsDefaultOtherExists(false);
          setIsDefault(true);
        }
      }
    }
  }, []);

  const addAddress = async () => {
    let isError = false;
    if (phone && phone.length !== 10) {
      setPhoneError('Invalid Contact No.');
      setTimeout(() => {
        setPhoneError(null);
      }, 3000);
      return;
    }
    if (!address1 || address1.length < 3) {
      setAddres1Error('Invalid Address 1');
      setTimeout(() => {
        setAddres1Error(null);
      }, 2500);
      isError = true;
    }
    if (!address2 || address2.length < 3) {
      setAddres2Error('Invalid Address 2');
      setTimeout(() => {
        setAddres2Error(null);
      }, 2500);
      isError = true;
    }
    if (!city || city.length < 3) {
      setCityError('Invalid City');
      setTimeout(() => {
        setCityError(null);
      }, 2500);
      isError = true;
    }
    if (!state || state.length < 2) {
      setStateError('Invalid State');
      setTimeout(() => {
        setStateError(null);
      }, 2500);
      isError = true;
    }
    if (!zipCode || zipCode.length < 3) {
      setZipCodeError('Invalid Postal Code');
      setTimeout(() => {
        setZipCodeError(null);
      }, 2500);
      isError = true;
    }
    if (!isDefaultOtherExists && !isDefault) {
      setIsDefaultError('Atleast One Default Address Required');
      setTimeout(() => {
        setIsDefaultError(null);
      }, 2500);
      isError = true;
    }
    if (isError) {
      return;
    }
    if (props.canUpdate) {
      if (isDefault) {
        addresses.forEach((element, index) => {
          addresses[index].isDefault = false;
        });
      }
      if (addressId || addressId === 0) {
        addresses[addressId].name = name;
        addresses[addressId].phone = phone;
        addresses[addressId].zipCode = zipCode;
        addresses[addressId].state = state;
        addresses[addressId].city = city;
        addresses[addressId].address1 = address1;
        addresses[addressId].address2 = address2;
        addresses[addressId].country = country;
        addresses[addressId].addressString = addressString;
        addresses[addressId].isDefault = isDefault;
      } else {
        addresses.push({
          name,
          phone,
          zipCode,
          state,
          city,
          address1,
          address2,
          country,
          addressString,
          isDefault,
        });
      }
      setIsLoading(true);
      let userResp = await updateUser(userId, {
        addresses,
      });
      if (userResp) {
        localStorage.setItem('user', JSON.stringify(userResp));
        props.refreshAddress();
        props.closeModal();
      }
      setIsLoading(false);
    } else {
      let address = {
        name,
        phone,
        zipCode,
        state,
        city,
        address1,
        address2,
        country,
        addressString,
        isDefault,
      };
      props.addAddress(address);
      props.closeModal();
    }
  };

  return (
    <Box sx={modalStyle}>
      <IconButton
        onClick={() => props.closeModal()}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zindex: 999,
        }}
        aria-label='delete'
        size='large'
      >
        <CloseRounded sx={{ fontSize: 30 }} />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Typography component='h4' variant='h5' sx={{ color: 'text.primary' }}>
          {addressId || addressId === 0 ? 'Edit' : 'New'} Address
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
          flex: 1,
        }}
      >
        <GooglePlacesInput ref={googleRef} editable={isgoogleEditable} setAddress={setAddress}></GooglePlacesInput>
      </Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <TextField
              inputProps={{ type: 'text' }}
              id='name'
              name='name'
              required
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
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <TextField
              inputProps={{ type: 'tel' }}
              id='phone'
              name='phone'
              required
              label='Contact No.'
              value={phone}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              variant='standard'
            />
            {phoneError ? <FormHelperText error>{phoneError}</FormHelperText> : null}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <TextField
          inputProps={{ type: 'text' }}
          id='address1'
          name='address1'
          label='Address 1'
          value={address1}
          required
          fullWidth
          inputRef={address1Ref}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Home />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setAddres1(e.target.value);
          }}
          variant='standard'
        />
        {address1Error ? <FormHelperText error>{address1Error}</FormHelperText> : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <TextField
          inputProps={{ type: 'text' }}
          id='address2'
          name='address2'
          label='Address 2'
          value={address2}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Signpost />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setAddres2(e.target.value);
          }}
          variant='standard'
        />
        {address2Error ? <FormHelperText error>{address2Error}</FormHelperText> : null}
      </Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <TextField
              inputProps={{ type: 'text' }}
              id='city'
              name='city'
              required
              label='City'
              value={city}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationCity />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              variant='standard'
            />
            {cityError ? <FormHelperText error>{cityError}</FormHelperText> : null}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <TextField
              inputProps={{ type: 'text' }}
              id='state'
              name='state'
              required
              label='State'
              value={state}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setState(e.target.value);
              }}
              variant='standard'
            />
            {stateError ? <FormHelperText error>{stateError}</FormHelperText> : null}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <TextField
          inputProps={{ type: 'text' }}
          id='zip'
          name='zip'
          required
          label='Postal Code'
          value={zipCode}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Map />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
          variant='standard'
        />
        {zipCodeError ? <FormHelperText error>{zipCodeError}</FormHelperText> : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'start',
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <InputLabel sx={{ marginBottom: 0 }} shrink={false} htmlFor='is-default'>
            <Typography>Is Default{isDefaultOtherExists ? '' : '*'}</Typography>
          </InputLabel>
          <Switch
            variant='standard'
            name='is-default'
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        {isDefaultError ? <FormHelperText error>{isDefaultError}</FormHelperText> : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Button
          onClick={addAddress}
          disabled={isLoading}
          type='submit'
          variant='contained'
          sx={{ width: { xs: '75%', sm: '25%' } }}
        >
          {isLoading ? <CircularProgress size={25} color='inherit' /> : 'Save'}
        </Button>
      </Box>
    </Box>
  );
}
