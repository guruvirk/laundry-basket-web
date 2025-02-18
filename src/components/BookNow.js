import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Phone } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function BookNow() {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      style={{ paddingRight: 0, paddingLeft: 0 }}
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 6 },
      }}
    >
      <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
        <Grid item xs={12} sm={5.5} md={5.5}>
          <img style={{ width: '100%' }} src={require('../assets/images/book-now.jpg')} alt='new' />
        </Grid>
        <Grid
          item
          xs={3}
          sm={1}
          md={1}
          sx={{ background: '#13263d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: '#13263d',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              margin: 'auto',
              marginLeft: '-100px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant='body2' sx={{ color: 'text.white', fontWeight: 600 }}>
                  Starting at only
                </Typography>
                <Typography variant='h2' sx={{ color: 'text.white', marginTop: '-5px' }}>
                  $1.99
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={9}
          sm={5.5}
          md={5.5}
          sx={{
            background: '#13263d',
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Box sx={{ width: '80%' }}>
            <Typography component='h2' variant='h2' sx={{ color: 'text.white', pb: 2 }}>
              Quality laundry service with free{' '}
              <Typography component='h2' variant='h2' sx={{ color: 'text.primary', display: 'inline' }}>
                pickup & delivery
              </Typography>
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.white' }}>
              Experience premium laundry care with expert cleaning and meticulous attention to detail. Enjoy free pickup and
              delivery for ultimate convenience!
            </Typography>
            <br></br>
            <Button size='large' sx={{ mt: 3, fontSize: 30, fontWeight: 600, color: 'text.white' }}>
              <Phone
                sx={{
                  color: 'text.white',
                  mr: 1.5,
                  fontSize: 38,
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  padding: 1,
                }}
              />
              (000) 000-0000
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box container sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
        <Box
          sx={{
            background: '#13263d',
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '85%', pt: 5, textAlign: 'center' }}>
            <Typography component='h3' variant='h3' sx={{ color: 'text.white', pb: 2 }}>
              Quality laundry service with free{' '}
              <Typography component='h3' variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                pickup & delivery
              </Typography>
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.white' }}>
              Experience premium laundry care with expert cleaning and meticulous attention to detail. Enjoy free pickup and
              delivery for ultimate convenience!
            </Typography>
            <br></br>
            <Button size='large' sx={{ mt: 3, fontSize: 30, fontWeight: 600, color: 'text.white' }}>
              <Phone
                sx={{
                  color: 'text.white',
                  mr: 1.5,
                  fontSize: 38,
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  padding: 1,
                }}
              />
              (000) 000-0000
            </Button>
          </Box>
        </Box>
        <Box sx={{ background: '#13263d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: '#13263d',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              margin: 'auto',
              marginBottom: '-100px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant='body2' sx={{ color: 'text.white', fontWeight: 600 }}>
                  Starting at only
                </Typography>
                <Typography component='h2' variant='h2' sx={{ color: 'text.white', marginTop: '-5px' }}>
                  $1.99
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <img style={{ width: '100%' }} src={require('../assets/images/book-now.jpg')} alt='new' />
      </Box>
    </Container>
  );
}
