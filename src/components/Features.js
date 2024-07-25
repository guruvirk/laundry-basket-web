/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardActions, CardContent, CardMedia, Chip as MuiChip } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';

const items = [
  {
    icon: <BookmarkAddedIcon fontSize='large' />,
    title: 'Quality',
    description: 'Expert professionals handling your clothes with utmost care.',
    image: require('../assets/images/women-shot.png'),
    text: 'At Laundry Basket, we pride ourselves on delivering exceptional laundry services that go beyond the ordinary. Our commitment to quality is evident in every step of our process. We use only top-tier, eco-friendly detergents and cutting-edge washing technology to ensure your garments are not just clean, but impeccably fresh and vibrant. Our experienced team handles each item with the utmost care, treating your clothes as if they were their own.',
  },
  {
    icon: <SearchIcon fontSize='large' />,
    title: 'Transparency',
    description: 'Neighbourhood live laundry stores offering service as you please.',
    image: require('../assets/images/women-shot.png'),
    text: 'At Laundry Basket, transparency is at the heart of everything we do. We believe that our customers deserve to know exactly how their garments are being handled and cared for. From the moment your clothes enter our facility, we provide clear and open communication about our processes, pricing, and expected turnaround times. We use only high-quality, eco-friendly products, and we’re upfront about the steps we take to ensure your clothes are treated with the utmost care.',
  },
  {
    icon: <BoltIcon fontSize='large' />,
    title: 'Speed',
    description: 'Shorter turnaround times, delivery within 24 hours of pick up.',
    image: require('../assets/images/women-shot.png'),
    text: "At Laundry Basket, we understand that in today's fast-paced world, time is of the essence. That's why we've optimized our processes to provide swift and efficient laundry services without compromising on quality. Our state-of-the-art machines and well-coordinated team ensure that your garments are cleaned, pressed, and ready for you in record time.",
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background: 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id='features' maxWidth='xlg' sx={{ pt: { xs: 4, sm: 8 }, pb: { xs: 8, sm: 0 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
              Our Promise
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
              At Laundry Basket, we bring the best-in-class Laundry, Dry Cleaning and Home Cleaning Services at your
              doorstep!
            </Typography>
          </div>
          <Grid container item sx={{ gap: 1, display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                sx={{
                  '& .MuiChip-label': {
                    color: 'white',
                  },
                }}
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                selected={selectedItemIndex === index}
              />
            ))}
          </Grid>
          <Card variant='outlined' sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}>
            <Box
              sx={(theme) => ({
                height: 240,
              })}
            >
              <img
                style={{
                  height: 240,
                }}
                src={selectedFeature.image}
              />
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                {selectedFeature.title}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1.5 }}>
                {selectedFeature.description}
              </Typography>
            </Box>
          </Card>
          <Stack
            direction='column'
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    '&:hover': {
                      background:
                        'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
                      borderColor: 'primary.light',
                      boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
                      ...theme.applyStyles('dark', {
                        background:
                          'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                        borderColor: 'primary.dark',
                        boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
                      }),
                    },
                  }),
                  selectedItemIndex === index &&
                    ((theme) => ({
                      backgroundColor: 'action.selected',
                      borderColor: 'primary.light',
                      ...theme.applyStyles('dark', {
                        borderColor: 'primary.dark',
                      }),
                    })),
                ]}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={[
                      (theme) => ({
                        color: 'grey.400',
                        ...theme.applyStyles('dark', {
                          color: 'grey.600',
                        }),
                      }),
                      selectedItemIndex === index && {
                        color: 'primary.main',
                      },
                    ]}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                      {title}
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1.5 }}>
                      {description}
                    </Typography>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}>
          <Card
            variant='outlined'
            sx={{
              height: '100%',
              width: '100%',
            }}
          >
            <CardMedia
              component='img'
              alt={'alt'}
              sx={{ height: 250, objectFit: 'contain' }}
              image={selectedFeature.image}
              title='green iguana'
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                {selectedFeature.text}
              </Typography>
            </CardContent>
            <CardActions className='justify-center'>
              <Button variant='contained'>Book Now</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
