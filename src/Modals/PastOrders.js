import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid, Typography, Container } from '@mui/material';
import moment from 'moment';
import { getOrders } from '../utils/api_base';
import Icon from '@mui/material/Icon';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import { LocalActivity, LocationOn } from '@mui/icons-material';

const PastOrders = (props) => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [loadedPages, setLoadedPages] = useState(0);
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoadedPages(1);
    setIsLoading(true);
    getCurrentOrder();
  }, [props.user]);

  const getCurrentOrder = async () => {
    let page = await getOrders({
      status: 'past',
      limit: 20,
      category: 'laundry',
    });
    if (page && page.items && page.items.length) {
      setListData(page.items);
    }
    setIsLoading(false);
  };

  const getData = async (page) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (page <= totalPages) {
          resolve([]);
        } else {
          resolve([]);
        }
      }, 2000);
    });
  };

  const loadMoreData = async () => {
    if (loadedPages < totalPages) {
      setIsLoading(true);
      setLoadedPages(loadedPages + 1);
      let extraData = await getData(loadedPages + 1);
      setListData([...listData, ...extraData]);
      setIsLoading(false);
    }
  };

  const getTitleCase = (stringData) => {
    if (stringData && stringData.length) {
      return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
    } else {
      return '';
    }
  };

  const getProgress = (status) => {
    let progress = 0;
    switch (status) {
      case 'pending':
        progress = 0;
        break;
      case 'placed':
        progress = 10;
        break;
      case 'assigned':
        progress = 20;
        break;
      case 'picked-up':
        progress = 40;
        break;
      case 'in-progress':
        progress = 60;
        break;
      case 'completed':
        progress = 90;
        break;
      case 'delivered':
        progress = 100;
        break;
    }
    return progress;
  };

  const getIcon = (item) => {
    if (item.status === 'delivered') {
      return 'assignment_turned_in';
    }
    let iconName = '';
    if (item.items && item.items.length) {
      let randomIndex = Math.floor(Math.random() * item.items.length);
      let iconItem = item.items.sort((a, b) => b.units - a.units)[randomIndex || 0];
      if (iconItem.isItem) {
        iconName = iconItem.icon;
      } else {
        iconName = iconItem.service.icon;
      }
    } else {
      let randomIndex = Math.floor(Math.random() * item.services.length);
      iconName = item.services[randomIndex || 0].icon;
    }
    if (iconName === 'tumble-dryer') {
      return 'local_laundry_service';
    } else if (iconName === 'washing-machine') {
      return 'local_laundry_service';
    } else if (iconName === 'hanger') {
      return 'dry_cleaning';
    } else if (iconName === 'bed-king') {
      return 'king_bed';
    } else if (iconName === 'shoe-sneaker') {
      return 'steps';
    } else if (iconName === 'iron') {
      return 'iron';
    }
  };

  const getFormattedMiniAddress = (selectedAddress) => {
    let address = '';
    if (selectedAddress) {
      address = selectedAddress.address2 + ', ' + selectedAddress.city + ', ' + selectedAddress.zipCode;
    }
    return address;
  };

  return (
    <Box>
      {listData.map((item, index) => (
        <Container>
          <div className='order-list' key={index} onClick={() => navigate('/orders/' + item.id)}>
            <Box
              sx={{
                px: { xs: 1.5, sm: 3 },
                pt: { xs: 3, sm: 0 },
                pb: { xs: 0, sm: 1 },
                backgroundColor: 'actionLite.selected',
                borderRadius: '25px',
                mt: 3,
              }}
            >
              <Grid container alignItems='center' justifyContent='center' spacing={1}>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  container
                  alignItems='center'
                  justifyContent='center'
                  spacing={1}
                  style={{
                    paddingTop: '2px',
                    paddingBottom: '2px',
                  }}
                  sx={{ display: { xs: 'flex', sm: 'none' }, borderBottomWidth: 1 }}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    style={{
                      paddingTop: '2px',
                    }}
                  >
                    <Typography
                      sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pl: 1 }}
                      variant='title'
                    >
                      Order ID: {item.code}
                    </Typography>
                  </Grid>
                  <Grid
                    style={{
                      paddingTop: '2px',
                    }}
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                  >
                    <Typography sx={{ color: 'text.secondary', textAlign: 'end', pr: 1 }} variant='subtitle1'>
                      Status:{' '}
                      <Typography sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }} variant='subtitle1'>
                        {getTitleCase(item.status)}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  style={{
                    paddingBottom: '0px',
                  }}
                  item
                  xs={3}
                  sm={2}
                  md={2}
                  alignItems='center'
                  justifyContent='center'
                  spacing={1}
                  sx={{ my: 1, pb: 1 }}
                >
                  <Box className='progress-box'>
                    <CircularProgressbarWithChildren
                      styles={buildStyles({
                        pathColor: `hsl(205, 100%, 50%)`,
                        trailColor: '#d6d6d6',
                      })}
                      value={getProgress(item.status)}
                    >
                      <Icon sx={{ fontSize: 45 }} color='primary'>
                        {getIcon(item)}
                      </Icon>
                    </CircularProgressbarWithChildren>
                  </Box>
                </Grid>
                <Grid
                  style={{
                    paddingBottom: '0px',
                  }}
                  item
                  xs={9}
                  sm={6}
                  md={6}
                  alignItems='center'
                  justifyContent='center'
                  spacing={1}
                  sx={{ my: 1, pb: 1 }}
                >
                  <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='title'>
                    Order ID: {item.code}
                  </Typography>
                  {Boolean(item.items) && item.items.length > 0 && (
                    <>
                      <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
                        {Boolean(item.items) &&
                          (item.items.length > 3 ? item.items.slice(0, 3) : item.items).map((itemsItem, itemsItemIndex) => (
                            <Typography
                              sx={{ display: 'inline', color: 'text.secondary' }}
                              key={itemsItemIndex}
                              variant='subtitle1'
                            >
                              {itemsItemIndex !== 0 && ', '}
                              {itemsItem.name}
                              {Boolean(item.items) && itemsItemIndex === 2 && item.items.length > 3 && '...'}
                            </Typography>
                          ))}
                      </Typography>
                    </>
                  )}
                  {Boolean(item.services) && item.services.length > 0 && (
                    <>
                      {Boolean(item.services) &&
                        item.services.map((service, serviceIndex) => (
                          <Typography sx={{ color: 'text.secondary' }} key={serviceIndex} variant='subtitle1'>
                            {service.name}
                          </Typography>
                        ))}
                    </>
                  )}
                  <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                    {'Booked On: ' + moment(item.createdDate).format('ddd, DD MMM YYYY')}
                  </Typography>
                  {item.status === 'assigned' && Boolean(item.pickUpDate) && (
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      {'Expected Pickup: ' + moment(item.pickUpDate).format('ddd, DD MMM YYYY') + ' ' + item.pickUpSlot}
                    </Typography>
                  )}
                  {item.status === 'in-progress' && Boolean(item.expectedCompleteDate) && (
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      {'Expected Ready to Pickup: ' + moment(item.expectedCompleteDate).format('ddd, DD MMM YYYY')}
                    </Typography>
                  )}
                  {item.status === 'completed' && Boolean(item.expectedDeliveryDate) && (
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      {'Expected Delivery: ' + moment(item.expectedDeliveryDate).format('ddd, DD MMM YYYY')}
                    </Typography>
                  )}
                  {item.status === 'delivered'}
                  {Boolean(item.deliveryDate) && (
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      {'Delivered On: ' + moment(item.deliveryDate).format('ddd, DD MMM YYYY')}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  alignItems='center'
                  justifyContent='center'
                  spacing={1}
                  sx={{ my: 1, pb: 1 }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      Status:{' '}
                      <Typography sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }} variant='subtitle1'>
                        {getTitleCase(item.status)}
                      </Typography>
                    </Typography>
                    {item.type === 'prepared' && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        Total:{' '}
                        <Typography
                          sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }}
                          variant='subtitle1'
                        >
                          $ {Number(item.currentTotal).toFixed(2)}
                        </Typography>
                      </Typography>
                    )}
                    <Typography sx={{ color: 'text.secondary', mt: 0.5 }} variant='subtitle1'>
                      <LocationOn />
                      {'  '}
                      {getFormattedMiniAddress(item.address)}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    style={{
                      paddingTop: '2px',
                      paddingBottom: '2px',
                    }}
                    sx={{ display: { xs: 'flex', sm: 'none' }, borderTopWidth: 1 }}
                  >
                    <Grid
                      item
                      xs={item.type === 'prepared' ? 9 : 12}
                      sm={4}
                      md={4}
                      alignItems='center'
                      justifyContent='center'
                      spacing={1}
                      style={{
                        paddingTop: '2px',
                      }}
                    >
                      <Typography
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: 'text.secondary',
                          pl: 1,
                        }}
                        variant='subtitle1'
                      >
                        {getFormattedMiniAddress(item.address)}
                      </Typography>
                    </Grid>
                    {item.type === 'prepared' && (
                      <Grid
                        style={{
                          paddingTop: '2px',
                        }}
                        item
                        xs={3}
                        sm={4}
                        md={4}
                        alignItems='center'
                        justifyContent='center'
                        spacing={1}
                      >
                        <Typography
                          sx={{ fontWeight: 'bold', textAlign: 'end', color: 'primary.main', pr: 1 }}
                          variant='subtitle1'
                        >
                          $ {Number(item.currentTotal).toFixed(2)}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Container>
      ))}
    </Box>
  );
};

export default PastOrders;
