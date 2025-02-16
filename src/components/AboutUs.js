import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Stack } from '@mui/material';
import cover from '../assets/images/saloon.jpg';
import {
  AssignmentTurnedIn,
  LightMode,
  LocalShippingTwoTone,
  PhoneIphone,
  Sell,
  WorkspacePremiumOutlined,
} from '@mui/icons-material';
import Slider from 'react-slick';

export default function AboutUs(props) {
  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const items = [
    {
      icon: <LightMode fontSize='large' />,
      title: 'Persionalized Experience',
      description:
        'We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement.',
    },
    {
      icon: <Sell fontSize='large' />,
      title: 'Affordable Pricing',
      description:
        'Prices that suits your pocket is one of our USP. An option of choosing between 2 types of pricing is available.',
    },
    {
      icon: <PhoneIphone fontSize='large' />,
      title: 'Convenience',
      description:
        'With just a tap of a button, your laundry gets done, giving your leisure time to spend with family and friends.',
    },
    {
      icon: <WorkspacePremiumOutlined fontSize='large' />,
      title: 'Quality',
      description:
        'We use the best in class products, to assure that your favorite clothes are always there for you to wear.',
    },
    {
      icon: <LocalShippingTwoTone fontSize='large' />,
      title: 'Express Delivery',
      description: 'With our super express delivery, we would get your laundry done in less than 8 hours.',
    },
    {
      icon: <AssignmentTurnedIn fontSize='large' />,
      title: 'Instant Order Update',
      description: 'Regular updates of your order, to help you keep a track of your laundry and plan accordingly.',
    },
  ];

  React.useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant]);

  const getTags = (items) => {
    let tags = new Set();
    for (const item of items) {
      tags.add(item.tag);
    }
    return Array.from(tags);
  };

  const getTagItems = (items, tag) => {
    let tagItems = [];
    for (const item of items) {
      if (tag === item.tag) {
        tagItems.push(item);
      }
    }
    return tagItems;
  };

  const getTitleCase = (stringData) => {
    if (stringData && stringData.length) {
      return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
    } else {
      return '';
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
          className='wrapper'
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div style={{ zIndex: 99 }} className='text-center'>
            <div className='text-center'>
              <Typography className='text-center' sx={{ color: 'text.primary', typography: { sm: 'h2', xs: 'h1' } }}>
                About Us
              </Typography>
            </div>
          </div>
        </div>
      </Paper>

      {servicesLoaded && (
        <Box sx={{ width: '90%', mx: 'auto' }}>
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 8, sm: 12 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid item xs={12} sm={5.5} md={5.5} sx={{}}>
              <img className='how-it-works-img' src={require('../assets/images/how-it-works.jpg')} alt='new' />
            </Grid>
            <Grid item xs={12} sm={6.5} md={6.5}>
              <Box sx={{ width: { xs: '100%', sm: '95%' }, ml: 'auto' }}>
                <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 2.5 }}>
                  We Make Laundry{' '}
                  <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                    Effortless!
                  </Typography>
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                  At Laundry Basket, we believe that laundry shouldn’t be a chore—it should be simple, convenient, and
                  stress-free. That’s why we offer premium laundry services with free pickup and delivery, ensuring fresh,
                  clean clothes at your doorstep without the hassle.
                </Typography>
                <Stack direction='row' alignItems='center' gap={2} sx={{ my: 1, pt: 1 }}>
                  <img
                    style={{
                      height: '18px',
                    }}
                    src='https://iili.io/2QrYSRa.png'
                    alt='new'
                  />
                  <Typography sx={{ width: '100%', color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                    Convenience at Your Doorstep -{' '}
                    <Typography variant='subtitle1' sx={{ color: 'text.secondary', display: 'inline', fontWeight: 500 }}>
                      Just schedule a pickup, and we’ll take care of the rest!
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={2} sx={{ my: 1 }}>
                  <img
                    style={{
                      height: '18px',
                    }}
                    src='https://iili.io/2QrYSRa.png'
                    alt='new'
                  />
                  <Typography sx={{ width: '100%', color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                    Quality You Can Trust -{' '}
                    <Typography variant='subtitle1' sx={{ color: 'text.secondary', display: 'inline', fontWeight: 500 }}>
                      We use premium cleaning products and the latest techniques to ensure fresh, crisp, and well-maintained
                      clothing.
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={2} sx={{ my: 1 }}>
                  <img
                    style={{
                      height: '18px',
                    }}
                    src='https://iili.io/2QrYSRa.png'
                    alt='new'
                  />
                  <Typography sx={{ width: '100%', color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                    24-Hour Turnaround -{' '}
                    <Typography variant='subtitle1' sx={{ color: 'text.secondary', display: 'inline', fontWeight: 500 }}>
                      Need fresh laundry fast? We prioritize quick, efficient service.
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={2} sx={{ my: 1 }}>
                  <img
                    style={{
                      height: '18px',
                    }}
                    src='https://iili.io/2QrYSRa.png'
                    alt='new'
                  />
                  <Typography sx={{ width: '100%', color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                    Professional Care -{' '}
                    <Typography variant='subtitle1' sx={{ color: 'text.secondary', display: 'inline', fontWeight: 500 }}>
                      From Wash & Fold to Dry Cleaning, we cater to all your laundry needs with expert handling.
                    </Typography>
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={2} sx={{ my: 1 }}>
                  <img
                    style={{
                      height: '18px',
                    }}
                    src='https://iili.io/2QrYSRa.png'
                    alt='new'
                  />
                  <Typography sx={{ width: '100%', color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                    Eco-Friendly Practices -{' '}
                    <Typography variant='subtitle1' sx={{ color: 'text.secondary', display: 'inline', fontWeight: 500 }}>
                      We use environmentally safe detergents and sustainable methods to keep your clothes and the planet
                      clean.
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: { xs: 8, sm: 12 },
              px: { xs: 0, sm: 2, md: 5 },
              textAlign: { sm: 'left', md: 'center' },
            }}
          >
            <Typography component='h3' variant='h3' sx={{ color: 'text.secondary' }}>
              Why Choose{' '}
              <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                Us
              </Typography>
            </Typography>
            <Grid
              container
              spacing={2.5}
              sx={{
                pt: { xs: 4, sm: 4 },
              }}
            >
              {items.map((item, index) => (
                <Grid key={index} item xs={12} sm={4} md={4} sx={{ px: 2 }}>
                  <Grid container spacing={2.5} sx={{ mt: 0 }}>
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
                      <Box sx={{ pl: 1 }}>
                        <Typography sx={{ color: 'text.secondary', textAlign: 'left' }} component='h5' variant='h5'>
                          {item.title}
                        </Typography>
                        <Typography sx={{ pt: 1, color: 'text.neutral', textAlign: 'left' }} variant='body1'>
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 8, sm: 12 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid item xs={12} sm={6.5} md={6.5} sx={{ display: { xs: 'block', sm: 'none' } }}>
              <img className='how-it-works-img' src={require('../assets/images/how-it-works.jpg')} alt='new' />
            </Grid>
            <Grid item xs={12} sm={5.5} md={5.5}>
              <Box sx={{ width: '95%', mr: 'auto' }}>
                <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 2.5 }}>
                  The story behind how our{' '}
                  <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                    company was founded
                  </Typography>
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                  We’ve all been there—juggling work, family, and personal time while trying to squeeze in everyday chores
                  like laundry. Walking into laundromats during a busy schedule, waiting for machines, and folding piles of
                  clothes felt like a never-ending task. We saw professionals, students, and families struggling to keep up,
                  sacrificing their valuable time just to have fresh, clean clothes.
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                  That’s when we asked ourselves: Why should laundry be a hassle when life is already so busy?
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                  At Laundry Basket, we set out to change that. Our goal was simple—to make laundry effortless and accessible
                  to everyone. We built a service where fresh, professionally cleaned clothes could be just a pickup away. No
                  more laundromat visits, no more waiting—just convenient, high-quality laundry care delivered to your door.
                </Typography>
                <Typography variant='title' sx={{ color: 'text.secondary', pb: 2 }}>
                  Laundry Basket – Fresh Laundry, Without the Effort!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6.5} md={6.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <img className='how-it-works-img' src={require('../assets/images/how-it-works.jpg')} alt='new' />
            </Grid>
          </Grid>
          {/* <Box
            sx={{
              pt: { xs: 8, sm: 12 },
              px: { xs: 0, sm: 2, md: 5 },
              textAlign: { sm: 'left', md: 'center' },
            }}
          >
            <Typography component='h3' variant='h3' sx={{ color: 'text.secondary' }}>
              Laundry{' '}
              <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                Specialists
              </Typography>
            </Typography>
            <Typography
              sx={{ mt: 2, mb: 4, width: '50%', mx: 'auto', color: 'text.neutral', textAlign: 'center' }}
              variant='subtitle1'
            >
              Our team’s goal each day is to earn your business with each visit and to make your experience with us the
              absolute best.
            </Typography>
            <Slider {...settings}>
              <div>
                <Box
                  sx={{
                    p: 2,
                    alignContent: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '65%',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                    src='https://cdn-icons-png.flaticon.com/512/4730/4730811.png'
                    alt='new'
                  />
                  <Typography sx={{ color: 'text.primary', textAlign: 'center', mt: 2 }} component='h5' variant='h5'>
                    Gurpreet Kaur
                  </Typography>
                  <Typography sx={{ pt: 1, color: 'text.neutral', textAlign: 'center', mt: 1 }} variant='subtitle2'>
                    Operation Manager
                  </Typography>
                </Box>
              </div>
              <div>
                <Box
                  sx={{
                    p: 2,
                    alignContent: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '65%',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                    src='https://cdn-icons-png.flaticon.com/512/4730/4730811.png'
                    alt='new'
                  />
                  <Typography sx={{ color: 'text.primary', textAlign: 'center', mt: 2 }} component='h5' variant='h5'>
                    Pushpinder Kaur
                  </Typography>
                  <Typography sx={{ pt: 1, color: 'text.neutral', textAlign: 'center', mt: 1 }} variant='subtitle2'>
                    Service Manager
                  </Typography>
                </Box>
              </div>
              <div>
                <Box
                  sx={{
                    p: 2,
                    alignContent: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '65%',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                    src='https://cdn-icons-png.flaticon.com/512/4042/4042171.png'
                    alt='new'
                  />
                  <Typography sx={{ color: 'text.primary', textAlign: 'center', mt: 2 }} component='h5' variant='h5'>
                    Gurfateh Singh
                  </Typography>
                  <Typography sx={{ pt: 1, color: 'text.neutral', textAlign: 'center', mt: 1 }} variant='subtitle2'>
                    Service Manager
                  </Typography>
                </Box>
              </div>
              <div>
                <Box
                  sx={{
                    p: 2,
                    alignContent: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '65%',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                    src='https://cdn-icons-png.flaticon.com/512/4730/4730811.png'
                    alt='new'
                  />
                  <Typography sx={{ color: 'text.primary', textAlign: 'center', mt: 2 }} component='h5' variant='h5'>
                    Gurleen Kaur
                  </Typography>
                  <Typography sx={{ pt: 1, color: 'text.neutral', textAlign: 'center', mt: 1 }} variant='subtitle2'>
                    Service Manager
                  </Typography>
                </Box>
              </div>
            </Slider>
          </Box> */}
        </Box>
      )}
    </Container>
  );
}
