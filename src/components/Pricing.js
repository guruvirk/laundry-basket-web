import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import cover from '../assets/images/saloon.jpg';
import { Link } from 'react-router-dom';

export default function Pricing(props) {
  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant]);

  const increaseIndex = () => {
    if (index < services.length - 1) {
      setIndex(index + 1);
    }
  };

  const decreaseIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

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
      <Paper
        sx={{
          height: { xs: '180px', sm: '280px' },
          width: '100%',
          borderRadius: 0,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${cover})`,
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div className='text-center'>
            <div className='text-center'>
              <Typography className='text-center' sx={{ color: 'text.primary', typography: { sm: 'h4', xs: 'h6' } }}>
                HASSLE-FREE LAUNDRY AT AFFORDABLE PRICING
              </Typography>
            </div>
            <Button sx={{ mt: { xs: 2, sm: 5 }, fontSize: 18, fontWeight: 600, px: 3 }} variant='contained'>
              <Link to='/book-order'>Book Now</Link>
            </Button>
          </div>
        </div>
      </Paper>

      {servicesLoaded && (
        <>
          <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ pt: 6, pb: 4 }}>
            <Grid textAlign={'center'} item xs={2} sm={2} md={2}>
              {index > 0 && (
                <IconButton onClick={decreaseIndex} className='flex text-right justify-center'>
                  <ChevronLeft sx={{ fontSize: 40 }} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={8} sm={6} md={4}>
              <Box
                sx={{
                  width: 'fit-content',
                  m: 'auto',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{
                    height: '45px',
                  }}
                  src={services[index]?.webImages?.primary}
                  alt='new'
                />
                <Typography variant='h6' sx={{ paddingLeft: 2, paddingRight: 2, color: 'text.primary' }}>
                  {services[index]?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid textAlign={'center'} item xs={2} sm={2} md={2}>
              {index < services.length - 1 && (
                <IconButton
                  onClick={(e) => {
                    e.currentTarget.blur();
                    increaseIndex();
                  }}
                  className='flex text-right justify-center'
                >
                  <ChevronRight sx={{ fontSize: 40 }} />
                </IconButton>
              )}
            </Grid>
          </Grid>

          {services[index]?.isItem ? (
            <>
              <TableContainer
                sx={{
                  width: {
                    xs: '90%',
                    sm: '60%',
                    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                  },
                  m: 'auto',
                }}
                component={Paper}
              >
                <Table sx={{ width: '100%' }} aria-label='items'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography component='h6' sx={{ typography: { sm: 'h6', xs: 'subtitle2' } }} className='text-white'>
                          Price
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography component='h6' sx={{ typography: { sm: 'h6', xs: 'subtitle2' } }} className='text-white'>
                          ${Number(services[index].currentPrice).toFixed(2)}/lbs
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <Paper
                sx={{
                  borderRadius: '15px',
                  height: { xs: '180px', sm: '280px' },
                  width: { xs: '90%', sm: '60%' },
                  m: 'auto',
                  mt: 4,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${services[index].banner.url})`,
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
                    <div className='text-center'>
                      <Typography className='text-center' sx={{ color: 'text.primary', typography: { sm: 'h4', xs: 'h6' } }}>
                        {services[index].banner.title}
                      </Typography>
                      <Typography sx={{ typography: { sm: 'h6', xs: 'subtitle2' } }} className='text-white text-center'>
                        {services[index].banner.text}
                      </Typography>
                    </div>
                    <Button sx={{ mt: { xs: 2, sm: 5 }, fontSize: 18, fontWeight: 600, px: 3 }} variant='contained'>
                      <Link to='/book-order'>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </Paper>
            </>
          ) : (
            <TableContainer
              sx={{
                width: { xs: '90%', sm: '60%' },
                m: 'auto',
                background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
              }}
              component={Paper}
            >
              <Table sx={{ width: '100%' }} aria-label='items'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography component='h6' sx={{ typography: { sm: 'h6', xs: 'subtitle2' } }} className='text-white'>
                        Item
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography component='h6' sx={{ typography: { sm: 'h6', xs: 'subtitle2' } }} className='text-white'>
                        Price
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services[index]?.items.map((item) => (
                    <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <Typography sx={{ typography: { sm: 'subtitle2', xs: 'body1' } }} className='text-white'>
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography sx={{ typography: { sm: 'subtitle2', xs: 'body1' } }} className='text-white'>
                          ${Number(item.currentPrice).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
}
