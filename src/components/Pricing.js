import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Stack } from '@mui/material';
import cover from '../assets/images/saloon.jpg';
import { Link } from 'react-router-dom';

export default function Pricing(props) {
  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);

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
              <Typography className='text-center' sx={{ color: 'text.primary', typography: { sm: 'h4', xs: 'h6' } }}>
                HASSLE-FREE LAUNDRY AT AFFORDABLE PRICING
              </Typography>
            </div>
            <Button sx={{ mt: { xs: 2, sm: 5 }, fontSize: 18, fontWeight: 600, px: 3 }} variant='contained'>
              <Link to={props.isLoggedIn ? '/book-order' : '/login'}>Schedule PickUp</Link>
            </Button>
          </div>
        </div>
      </Paper>

      {servicesLoaded && (
        <>
          <Typography sx={{ px: { xs: 2, sm: 5 }, mt: 4, color: 'text.primary' }} variant='h4'>
            Pricing
          </Typography>
          <Grid container spacing={1} sx={{ pt: 2, pb: 4, px: { xs: 2, sm: 5 } }}>
            <Grid sx={{ display: { xs: 'flex', sm: 'none' } }} container spacing={1} item xs={12}>
              {services.map((serviceItem, itemIndex) => (
                <Grid sx={{ mt: 2 }} item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      borderWidth: '1px',
                      borderColor: itemIndex === index ? 'text.primary' : 'lightgray',
                      borderRadius: '15px',
                    }}
                  >
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setChecked(false);
                        setIndex(itemIndex);
                        setTimeout(() => {
                          setChecked(true);
                        }, 200);
                      }}
                    >
                      <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        gap={1.5}
                        sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                      >
                        <img
                          style={{
                            height: '28px',
                          }}
                          src={serviceItem.pic2}
                          alt='new'
                        />
                        <Typography
                          variant='subtitle2'
                          sx={{
                            color: itemIndex === index ? 'text.primary' : 'text.secondary',
                            fontWeight: 'bold',
                          }}
                        >
                          {serviceItem.name}
                        </Typography>
                      </Stack>
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid sx={{ display: { xs: 'none', sm: 'block' } }} item xs={12} sm={3} md={3}>
              {services.map((serviceItem, itemIndex) => (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setChecked(false);
                    setIndex(itemIndex);
                    setTimeout(() => {
                      setChecked(true);
                    }, 200);
                  }}
                >
                  <Box
                    sx={{
                      width: '95%',
                      py: 2,
                      mx: 'auto',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'start',
                      borderRightWidth: '2px',
                      borderRightColor: itemIndex === index ? 'text.primary' : 'lightgray',
                    }}
                  >
                    <Stack
                      direction='row'
                      justifyContent='flex-start'
                      alignItems='center'
                      gap={1}
                      sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                    >
                      <img
                        style={{
                          height: '40px',
                        }}
                        src={serviceItem.pic2}
                        alt='new'
                      />
                      <Typography
                        variant='title'
                        sx={{
                          paddingLeft: 3,
                          paddingRight: 2,
                          color: itemIndex === index ? 'text.primary' : 'text.secondary',
                        }}
                      >
                        {serviceItem.name}
                      </Typography>
                    </Stack>
                  </Box>
                </div>
              ))}
            </Grid>
            <Grid sx={{ mt: { xs: 5, sm: 0 } }} item xs={12} sm={6} md={6}>
              <Fade in={checked}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: 'actionLite.selected',
                    padding: 3,
                    borderRadius: '25px',
                  }}
                >
                  {services[index]?.isItem ? (
                    <>
                      <Typography variant='h5' sx={{ color: 'text.secondary' }}>
                        {services[index]?.name}
                      </Typography>
                      <Typography sx={{ mt: 2, color: 'text.secondary' }} variant='body1'>
                        {services[index]?.description}
                      </Typography>
                      <Typography sx={{ mt: 2, color: 'text.primary' }} variant='h6'>
                        Price: ${Number(services[index].currentPrice).toFixed(2)} / lbs
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                          padding: 3,
                          borderRadius: '25px',
                          mt: 3,
                        }}
                      >
                        <img
                          style={{
                            height: '65px',
                            marginBottom: '0.8rem',
                            marginTop: '0.2rem',
                          }}
                          src={services[index]?.pic4}
                          alt='new'
                        />
                        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                          {services[index]?.title}
                        </Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
                          {services[index]?.description2}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant='h5' sx={{ color: 'text.secondary' }}>
                        {services[index]?.name}
                      </Typography>
                      <Typography sx={{ mt: 2, color: 'text.secondary' }} variant='body1'>
                        {services[index]?.description}
                      </Typography>
                      <Typography sx={{ mt: 2, color: 'text.primary' }} variant='h6'>
                        Pricing
                      </Typography>
                      <Box sx={{ width: '100%', mt: 3 }}>
                        <ImageList sx={{ display: { xs: 'none', sm: 'block' } }} variant='masonry' cols={2} gap={20}>
                          {getTags(services[index]?.items).map((tag, tagIndex) => (
                            <ImageListItem key={tagIndex}>
                              <Box
                                sx={{
                                  backgroundColor: (theme) =>
                                    theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)',
                                  padding: 3,
                                  borderRadius: '25px',
                                }}
                              >
                                <img
                                  style={{
                                    height: '60px',
                                    marginBottom: '0.5rem',
                                    marginTop: '0.2rem',
                                  }}
                                  src={getTagItems(services[index]?.items, tag)[0].pic}
                                  alt='new'
                                />
                                <Typography variant='title' sx={{ color: 'text.secondary' }}>
                                  {getTitleCase(tag)}
                                </Typography>
                                {getTagItems(services[index]?.items, tag).map((tagItem, tagItemIndex) => (
                                  <Stack
                                    key={tagItemIndex}
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    gap={2}
                                    sx={{ my: 1 }}
                                  >
                                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                      {tagItem.name}
                                    </Typography>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle2'>
                                      ${Number(tagItem.currentPrice).toFixed(2)}
                                    </Typography>
                                  </Stack>
                                ))}
                              </Box>
                            </ImageListItem>
                          ))}
                        </ImageList>
                        <ImageList sx={{ display: { xs: 'block', sm: 'none' } }} variant='masonry' cols={1} gap={20}>
                          {getTags(services[index]?.items).map((tag, tagIndex) => (
                            <ImageListItem key={tagIndex}>
                              <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: '25px' }}>
                                <img
                                  style={{
                                    height: '60px',
                                    marginBottom: '0.5rem',
                                    marginTop: '0.2rem',
                                  }}
                                  src={getTagItems(services[index]?.items, tag)[0].pic}
                                  alt='new'
                                />
                                <Typography variant='title' sx={{ color: 'text.secondary' }}>
                                  {getTitleCase(tag)}
                                </Typography>
                                {getTagItems(services[index]?.items, tag).map((tagItem, tagItemIndex) => (
                                  <Stack
                                    key={tagItemIndex}
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    gap={2}
                                    sx={{ my: 1 }}
                                  >
                                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                      {tagItem.name}
                                    </Typography>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle2'>
                                      ${Number(tagItem.currentPrice).toFixed(2)}
                                    </Typography>
                                  </Stack>
                                ))}
                              </Box>
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    </>
                  )}
                </Box>
              </Fade>
            </Grid>
            <Grid sx={{ mt: { xs: 5, sm: 0 } }} item xs={12} sm={3} md={3}>
              <Box
                sx={{
                  width: '95%',
                  backgroundColor: 'actionLite.selected',
                  padding: 2,
                  ml: 'auto',
                  borderRadius: '25px',
                  borderColor: 'primary.main',
                  borderWidth: '1.5px',
                }}
              >
                <Typography
                  variant='title'
                  component='h6'
                  sx={{ width: '100%', color: 'text.secondary', textAlign: 'center' }}
                >
                  Please Note
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  {services[index]?.notes.map((note, noteIndex) => (
                    <Stack key={noteIndex} direction='row' alignItems='center' gap={2} sx={{ my: 3 }}>
                      <img
                        style={{
                          height: '18px',
                        }}
                        src='https://iili.io/2QrYSRa.png'
                        alt='new'
                      />
                      <Typography sx={{ width: '100%', color: 'text.secondary' }} variant='body3'>
                        {note}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
