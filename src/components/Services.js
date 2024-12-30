import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CheckCircleRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

library.add(faUser);

export default function ServicesPricing(props) {
  return (
    <Container
      maxWidth='xlg'
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 8 },
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
        <Typography component='h3' variant='h3' sx={{ color: 'text.secondary' }}>
          A wide range of{' '}
          <Typography component='h3' variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
            Services
          </Typography>
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.neutral', mt: 2 }}>
          Laundry Basket is committed to provide you with the best dry clean, laundry, shoe repairs and bag repairs, leather
          spa services in Bangalore at the most affordable rates with no compromise on quality.
        </Typography>
      </Box>
      {props.servicesLoaded ? (
        <Grid container spacing={5} sx={{ alignItems: 'center', justifyContent: 'center', px: { xs: 0, sm: 2, md: 5 } }}>
          {props.services.map((service) => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <Card
                sx={[
                  {
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  },
                  (theme) => ({
                    border: 'none',
                    boxShadow: `0 0 12px hsla(210, 98%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `0 0 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  }),
                ]}
              >
                <CardContent>
                  <Box
                    sx={[
                      {
                        textAlign: 'center',
                        justifyItems: 'center',
                        mb: 1,
                        gap: 2,
                      },
                    ]}
                  >
                    <img
                      style={{
                        width: '50%',
                      }}
                      src={service.pic3}
                      alt='new'
                    />
                    <Typography sx={{ mt: 2, color: 'text.secondary' }} component='h5' variant='h5'>
                      {service.name}
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'text.neutral', mt: 2, height: '70px' }}>
                      {service.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  );
}
