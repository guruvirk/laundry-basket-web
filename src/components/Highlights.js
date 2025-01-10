import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  Inventory2TwoTone,
  InventoryTwoTone,
  IronTwoTone,
  LocalLaundryServiceTwoTone,
  LocalShippingTwoTone,
} from '@mui/icons-material';

const items = [
  {
    icon: <LocalShippingTwoTone fontSize='large' />,
    title: '1. Pick Up',
    description:
      "A designated Laundry Basket driver arrives at the customer's location to collect the laundry at the scheduled time.",
  },
  {
    icon: <LocalLaundryServiceTwoTone fontSize='large' />,
    title: '2. Process',
    description:
      'Depending on your selected service—Wash & Fold, Wash & Iron, Dry Cleaning, or Iron, we carefully clean, iron, and prepare your garments with precision.',
  },
  {
    icon: <InventoryTwoTone fontSize='large' />,
    title: '3. Quality Check',
    description:
      'Each item pass through a rigorous quality check at Laundry Basket, ensuring they meet the highest standards.',
  },
  {
    icon: <LocalShippingTwoTone fontSize='large' />,
    title: '4. Delivery',
    description: 'Your fresh, clean laundry is delivered back to your doorstep, neatly packed and ready to use.',
  },
];

export default function Highlights() {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 6 },
      }}
    >
      <Grid container spacing={2.5} sx={{ px: { xs: 0, sm: 2, md: 5 } }}>
        <Grid item xs={12} sm={5} md={5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <img class='how-it-works-img' src={require('../assets/images/how-it-works.jpg')} alt='new' />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pl: { xs: 0, sm: 2 }, pb: 2 }}>
            How it works at{' '}
            <Typography component='h3' variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
              Laundry Basket
            </Typography>
          </Typography>
          {items.map((item, index) => (
            <Grid key={index} container spacing={2.5} sx={{ mt: 0 }}>
              <Grid item xs={2} sm={2} md={2}>
                <Box
                  sx={{
                    borderRadius: '50px',
                    backgroundColor: 'action.selected',
                    padding: 1.5,
                    margin: 'auto',
                    width: 'fit-content',
                  }}
                >
                  {item.icon}
                </Box>
              </Grid>
              <Grid item xs={10} sm={10} md={10}>
                <Typography sx={{ pl: { xs: 2, sm: 0 }, color: 'text.secondary' }} component='h5' variant='h5'>
                  {item.title}
                </Typography>
                <Typography sx={{ pl: { xs: 2, sm: 0 }, color: 'text.neutral' }} variant='body1'>
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={5} md={5} sx={{ display: { xs: 'block', sm: 'none' }, mt: 5 }}>
          <img class='how-it-works-img' src={require('../assets/images/how-it-works.jpg')} alt='new' />
        </Grid>
      </Grid>
    </Container>
  );
}
