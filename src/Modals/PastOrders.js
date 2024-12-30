import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid, Typography, Container } from '@mui/material';
import moment from 'moment';
import { getOrders } from '../utils/api_base';
import ImageIcon from '@mui/icons-material/Image';

const PastOrders = (props) => {
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
      status: 'inactive',
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
        progress = 25;
        break;
    }
    return progress;
  };

  const getIcon = (item) => {
    if (item.items && item.items.length) {
      let randomIndex = Math.floor(Math.random() * item.items.length);
      let iconItem = item.items.sort((a, b) => b.units - a.units)[randomIndex || 0];
      if (iconItem.isItem) {
        return iconItem.icon;
      } else {
        return iconItem.service.icon;
      }
    } else {
      let randomIndex = Math.floor(Math.random() * item.services.length);
      return item.services[randomIndex || 0].icon;
    }
  };

  return (
    <Box>
      {listData.map((item, index) => (
        <Container key={index}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={1}
            sx={{ my: 1, pb: 1, borderBottomWidth: 1 }}
          >
            <Grid item xs={3} sm={3} md={3} alignItems='center' justifyContent='center' spacing={1} sx={{ my: 1, pb: 1 }}>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid item xs={6} sm={6} md={6} alignItems='center' justifyContent='center' spacing={1} sx={{ my: 1, pb: 1 }}>
              {Boolean(item.items) && item.items.length > 0 && (
                <>
                  {Boolean(item.items) &&
                    item.items.map((itemsItem, itemsItemIndex) => (
                      <Typography key={itemsItemIndex} variant='subtitle1'>
                        {itemsItem.name + '' + (itemsItem.service ? itemsItem.service.name : '')}
                      </Typography>
                    ))}
                </>
              )}
              {Boolean(item.services) && item.services.length > 0 && (
                <>
                  {Boolean(item.services) &&
                    item.services.map((service, serviceIndex) => (
                      <Typography key={serviceIndex} variant='subtitle1'>
                        {service.name}
                      </Typography>
                    ))}
                </>
              )}
              <Typography variant='body1'>{'Booked On: ' + moment(item.createdDate).format('ddd, DD MMM YYYY')}</Typography>
              {Boolean(item.expectedDeliveryDate) && (
                <Typography variant='body1'>
                  {'Expected Delivery: ' + moment(item.expectedDeliveryDate).format('ddd, DD MMM YYYY')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} sm={3} md={3} alignItems='center' justifyContent='center' spacing={1} sx={{ my: 1, pb: 1 }}>
              <Typography variant='subtitle1'>{getTitleCase(item.status)}</Typography>
            </Grid>
          </Grid>
        </Container>
      ))}
    </Box>
  );
};

export default PastOrders;
