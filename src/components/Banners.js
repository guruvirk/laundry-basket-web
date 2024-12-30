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
      text: 'Experience the Magic of Clean Clothes',
      title: 'Laundry Basket',
    },
  ]);

  useEffect(() => {
    // if (props.tenant && props.tenant.banners) {
    //   setBanners(props.tenant.banners);
    // }
  }, []);

  return (
    <Container maxWidth='xlg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Carousel swipe={false}>
        {banners.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Container>
  );
}

function Item(props) {
  return (
    <Paper
      style={{
        borderRadius: '15px',
        backgroundImage: `url(${props.item.image})`,
        height: 400,
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          borderRadius: '15px',
          height: '100%',
          backgroundColor: 'rgba(0,0,0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div className='text-center'>
          <div className='text-center' style={{ height: { sm: 120, xs: 150 } }}>
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
            <Link to='/book-order'>Book Now</Link>
          </Button>
        </div>
      </div>
    </Paper>
  );
}
