import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Box, Container, Grid, Typography } from '@mui/material';
import { getOrder } from '../utils/api_base';
import moment from 'moment';

function OrderDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [nextStep, setNextStep] = useState(null);

  // useEffect(() => {
  //   if (props.isLoggedIn === false) {
  //     navigate('/');
  //   }
  //   let res = localStorage.getItem('user');
  //   if (res) {
  //     const user = JSON.parse(res);
  //     if (user) {
  //       setUser(user);
  //     }
  //   }
  //   setUserLoaded(true);
  // }, [navigate, props.isLoggedIn, props.user]);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        checkOrder(id);
      }, 2500);
    }
  }, [id]);

  const checkOrder = async (orderId) => {
    try {
      console.log('getOrder', orderId);
      var orderObj = await getOrder(orderId);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    if (orderObj) {
      setOrder(orderObj);
      getNextStep(orderObj);
      let isPending = false;
      for (const transaction of orderObj.transactions) {
        if (transaction.status === 'pending') {
          isPending = true;
        }
      }
      if (isPending) {
        // alert('Payment Failed or Pending!');
        setIsTransactionPending(true);
      } else {
        alert('Error: Payment Failed!');
      }
    }
  };

  const getNextStep = (orderObj) => {
    if (orderObj && orderObj.status == 'assigned' && orderObj.pickUpDate) {
      var date1_today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      var date1_tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.pickUpDate).diff(moment(), 'days');
      console.log('diff', diff);
      if (
        date1_today.getFullYear() == new Date(orderObj.pickUpDate).getFullYear() &&
        date1_today.getMonth() == new Date(orderObj.pickUpDate).getMonth() &&
        date1_today.getDate() == new Date(orderObj.pickUpDate).getDate()
      ) {
        setNextStep({
          time: `Pick Up Today ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      } else if (
        date1_tomorrow.getFullYear() == new Date(orderObj.pickUpDate).getFullYear() &&
        date1_tomorrow.getMonth() == new Date(orderObj.pickUpDate).getMonth() &&
        date1_tomorrow.getDate() == new Date(orderObj.pickUpDate).getDate()
      ) {
        setNextStep({
          time: `Pick Up Tomorrow ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Pick Up ${moment(orderObj.pickUpDate).format('dddd')} ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Pick Up ${moment(orderObj.pickUpDate).format('DD MMM')} ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      }
    } else if (orderObj && orderObj.status == 'picked-up') {
      setNextStep({
        time: `Your items are on their way to our washing facility for processing`,
        agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
      });
    } else if (orderObj && orderObj.status == 'in-progress' && !orderObj.expectedCompleteDate) {
      setNextStep({
        time: `Your items are being processed. We’ll update you with the expected finish time soon.`,
      });
    } else if (orderObj && orderObj.status == 'in-progress' && orderObj.expectedCompleteDate) {
      var date1_today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      var date1_tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedCompleteDate).diff(moment(), 'days');
      console.log('diff', diff);
      if (
        date1_today.getFullYear() == new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1_today.getMonth() == new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1_today.getDate() == new Date(orderObj.expectedCompleteDate).getDate()
      ) {
        setNextStep({
          time: `Your items are being processed and will be ready by Today ${moment(orderObj.expectedCompleteDate).format(
            'h A'
          )}`,
        });
      } else if (
        date1_tomorrow.getFullYear() == new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1_tomorrow.getMonth() == new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1_tomorrow.getDate() == new Date(orderObj.expectedCompleteDate).getDate()
      ) {
        setNextStep({
          time: `Your items are being processed and will be ready by Tomorrow ${moment(orderObj.expectedCompleteDate).format(
            'h A'
          )}`,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Your items are being processed and will be ready by ${moment(orderObj.expectedCompleteDate).format(
            'dddd'
          )} ${moment(orderObj.expectedCompleteDate).format('h A')}`,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Your items are being processed and will be ready by ${moment(orderObj.expectedCompleteDate).format(
            'DD MMM'
          )} ${moment(orderObj.expectedCompleteDate).format('h A')}`,
        });
      }
    } else if (orderObj && orderObj.status == 'completed' && !orderObj.expectedDeliveryDate) {
      setNextStep({
        time: `Your items are ready! We’ll update you with the delivery time shortly.`,
      });
    } else if (orderObj && orderObj.status == 'completed' && orderObj.expectedDeliveryDate) {
      var date1_today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      var date1_tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedDeliveryDate).diff(moment(), 'days');
      console.log('diff', diff);
      if (
        date1_today.getFullYear() == new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1_today.getMonth() == new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1_today.getDate() == new Date(orderObj.expectedDeliveryDate).getDate()
      ) {
        setNextStep({
          time: `Your items are ready and will be delivered by Today ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      } else if (
        date1_tomorrow.getFullYear() == new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1_tomorrow.getMonth() == new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1_tomorrow.getDate() == new Date(orderObj.expectedDeliveryDate).getDate()
      ) {
        setNextStep({
          time: `Your items are ready and will be delivered by Tomorrow ${moment(orderObj.expectedDeliveryDate).format(
            'h A'
          )}`,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Your items are ready and will be delivered by ${moment(orderObj.expectedDeliveryDate).format(
            'dddd'
          )} ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Your items are ready and will be delivered by ${moment(orderObj.expectedDeliveryDate).format(
            'DD MMM'
          )} ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      }
    }
  };

  return (
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          Order Details
        </Typography>

        {order && (
          <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 6, pb: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant='subtitle1'>Order ID: {order.code}</Typography>
              <Typography variant='subtitle1'>{moment(order.createdDate).format('ddd, DD MMM YYYY h:mm A')}</Typography>
              {Boolean(order.items) && order.items.length > 0 && isTransactionPending && (
                <Typography variant='subtitle1'>
                  Please complete payment in the app for a seamless, contactless delivery.
                </Typography>
              )}
              {Boolean(nextStep) && Boolean(nextStep.time) && (
                <Box>
                  {Boolean(nextStep.time) && <Typography variant='subtitle1'>{nextStep.time}</Typography>}
                  {Boolean(nextStep.agent) && <Typography variant='subtitle1'>{nextStep.agent}</Typography>}
                </Box>
              )}
              <Typography variant='subtitle1'>Order Status: {order.status}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default OrderDetails;
