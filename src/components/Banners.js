import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Banners(props) {
  const [banners, setBanners] = useState([
    {
      image: require('../assets/images/saloon.jpg'),
      text: 'Freshness Guaranteed, Every Time',
      title: 'Save 50% Launch Offer',
    },
    {
      image: require('../assets/images/coats.jpg'),
      text: 'Laundry services collected and delivered to you!',
      title: 'Laundry Basket',
    },
  ]);

  useEffect(() => {
    // if (props.tenant && props.tenant.banners) {
    //   setBanners(props.tenant.banners);
    // }
  }, []);

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
      <Carousel swipe={false}>
        {banners.map((item, i) => (
          <Item isLoggedIn={props.isLoggedIn} key={i} item={item} />
        ))}
      </Carousel>
    </Container>
  );
}

function Item(props) {
  return (
    <Paper
      sx={{
        backgroundImage: `url(${props.item.image})`,
        height: { xs: '84vh', sm: '85vh', md: '82vh' },
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
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
          <div className='text-center' style={{ height: { sm: 150, xs: 180 } }}>
            <Typography
              component='h1'
              className='text-center pb-5'
              sx={{ color: 'text.primary', typography: { sm: 'h2', xs: 'h3' } }}
            >
              {props.item.title}
            </Typography>
            <Typography component='h5' sx={{ typography: { sm: 'h5', xs: 'h6' } }} className='text-white text-center pb-10'>
              {props.item.text}
            </Typography>
          </div>
          <Button sx={{ mt: { xs: 2, sm: 5 }, fontSize: 18, fontWeight: 600, px: 3 }} variant='contained'>
            <Link to={props.isLoggedIn ? '/book-order' : '/login'}>Schedule PickUp</Link>
          </Button>
        </div>
      </div>
    </Paper>
  );
}
