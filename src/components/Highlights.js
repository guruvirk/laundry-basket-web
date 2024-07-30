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
    title: 'Pick Up',
    description:
      "A designated Laundry Basket driver arrives at the customer's location to collect the laundry at the scheduled time.",
  },
  {
    icon: <LocalLaundryServiceTwoTone fontSize='large' />,
    title: 'Wash',
    description:
      'Items are sorted based on fabric, color, and care requirments, then undergo washing or dry-cleaning at the Laundry Basket facility',
  },
  {
    icon: <InventoryTwoTone fontSize='large' />,
    title: 'Quality Check',
    description:
      'Cleaned items pass through a rigorous quality check at Laundry Basket, ensuring they meet the highest standards.',
  },
  {
    icon: <IronTwoTone fontSize='large' />,
    title: 'Iron or Fold',
    description: 'Place the ironing board on a flat, stable surface. Ensure it is clean and free of any dirt or residue.',
  },
  {
    icon: <Inventory2TwoTone fontSize='large' />,
    title: 'Packaging',
    description:
      'The cleaned and inspected items are expertly folded or hung and then carefully packaged by Laundry Basket team.',
  },
  {
    icon: <LocalShippingTwoTone fontSize='large' />,
    title: 'Delivery',
    description: "A designated Laundry Basket driver delivers the package at the customer's location at the scheduled time.",
  },
];

export default function Highlights() {
  return (
    <Box
      id='how-we-work'
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 8 },
        color: 'white',
        background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
      }}
    >
      <Container
        maxWidth='xlg'
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component='h4' variant='h4'>
            How We Work ?
          </Typography>
          <Typography variant='body1' sx={{ color: 'grey.400' }}>
            Just hand off your clothes to us. We will do the rest!
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction='column'
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'hsla(220, 25%, 25%, .3)',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  boxShadow: 'none',
                }}
              >
                <Box
                  sx={[
                    (theme) => ({
                      color: 'primary.main',
                    }),
                  ]}
                >
                  {item.icon}
                </Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
