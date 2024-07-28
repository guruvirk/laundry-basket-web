import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Banners(props) {
  return (
    <Container maxWidth='xlg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Carousel>
        {props.tenant?.banners?.map((item, i) => (
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
        backgroundImage: `url(${props.item.url})`,
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
          <div className='text-center' style={{ height: 120 }}>
            <Typography className='text-center pb-5' sx={{ color: 'text.primary', typography: { sm: 'h2', xs: 'h5' } }}>
              {props.item.title}
            </Typography>
            <Typography sx={{ typography: { sm: 'h5', xs: 'h6' } }} className='text-white text-center pb-10'>
              {props.item.text}
            </Typography>
          </div>
          <Button sx={{ mt: { xs: 2, sm: 5 }, fontSize: 18, fontWeight: 600, px: 3 }} variant='contained-banner'>
            <Link to='/book-order'>Book Now</Link>
          </Button>
        </div>
      </div>
    </Paper>
  );
}
