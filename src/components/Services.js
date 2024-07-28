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

export default function Services(props) {
  return (
    <Container
      maxWidth='xlg'
      sx={{
        pt: { xs: 4, sm: 8 },
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
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          Services
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Laundry Basket is committed to provide you with the best dry clean, laundry, shoe repairs and bag repairs, leather
          spa services in Bangalore at the most affordable rates with no compromise on quality.
        </Typography>
      </Box>
      {props.servicesLoaded ? (
        <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
                    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    boxShadow: `0 8px 12px hsla(210, 98%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  }),
                ]}
              >
                <CardContent>
                  <Box
                    sx={[
                      {
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                      },
                      { color: 'grey.100' },
                    ]}
                  >
                    <img
                      style={{
                        height: '60px',
                      }}
                      src={service.webImages?.default}
                      alt='new'
                    />
                    {service.isItem ? (
                      <Typography component='h5' variant='h5'>
                        ${service.currentPrice} / lbs
                      </Typography>
                    ) : null}
                  </Box>
                  <Box
                    sx={[
                      {
                        mt: 3,
                      },
                      { color: 'grey.50' },
                    ]}
                  >
                    <Typography component='h5' variant='h5'>
                      {service.name}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                  {service.pointers?.map((line) => (
                    <Box key={line} sx={{ py: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      {line ? (
                        <CheckCircleRounded
                          sx={[
                            {
                              width: 20,
                            },
                            { color: 'white' },
                          ]}
                        />
                      ) : null}
                      <br />
                      <Typography variant='body1' component={'span'} sx={[{ color: 'grey.50', whiteSpace: 'nowrap' }]}>
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Button fullWidth sx={{ fontSize: 18, fontWeight: 600 }} color='secondary' variant='contained'>
                    <Link to='/book-order'>Book Now</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  );
}
