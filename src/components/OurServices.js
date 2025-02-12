import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Stack } from '@mui/material';
import cover from '../assets/images/saloon.jpg';
import {
  AssignmentTurnedIn,
  LightMode,
  LocalShippingTwoTone,
  PhoneIphone,
  Sell,
  WorkspacePremiumOutlined,
} from '@mui/icons-material';
import Slider from 'react-slick';
import Services from './Services';

export default function OurServices(props) {
  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant]);

  return (
    <Container
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '60px',
        paddingBottom: '30px',
        maxWidth: 'none',
      }}
      sx={{ width: '100%' }}
    >
      <Paper
        sx={{
          height: { xs: '180px', sm: '280px' },
          width: '100%',
          borderRadius: 0,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${cover})`,
        }}
      >
        <div
          className='wrapper'
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div style={{ zIndex: 99 }} className='text-center'>
            <div className='text-center'>
              <Typography className='text-center' sx={{ color: 'text.primary', typography: { sm: 'h2', xs: 'h1' } }}>
                Our Services
              </Typography>
            </div>
          </div>
        </div>
      </Paper>

      {servicesLoaded && (
        <Box sx={{ width: '90%', mx: 'auto' }}>
          <Services isLoggedIn={props.isLoggedIn} services={services} servicesLoaded={servicesLoaded} />
        </Box>
      )}
    </Container>
  );
}
