import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Banners(props) {
  return (
    <Container id='features' sx={{ pt: { xs: 12, sm: 20 } }}>
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
        backgroundImage: `url(${props.item.url})`,
        height: 400,
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundColor: 'rgba(0,0,0, 0.57)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div className=' text-center'>
          <Typography className='text-center' variant='h2' sx={{ color: 'text.primary' }}>
            {props.item.title}
          </Typography>
          <Typography variant='h4' className='text-white text-center pb-10'>
            {props.item.text}
          </Typography>
          <Button variant='contained'>Book Now</Button>
        </div>
      </div>
    </Paper>
  );
}
