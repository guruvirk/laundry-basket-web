import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { createTransactionOrder, getOrder } from '../utils/api_base';
import moment from 'moment';
import {
  BorderBottom,
  CreditCard,
  Delete,
  EventAvailable,
  Inventory2,
  LocalLaundryService,
  LocalShipping,
  Phone,
  SupportAgent,
  WhereToVote,
} from '@mui/icons-material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import PayExistingOrder from '../Modals/PayExistingOrder';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getTitleCase = (stringData) => {
  if (stringData && stringData.length) {
    return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
  } else {
    return '';
  }
};

function OrderDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [nextStep, setNextStep] = useState(null);
  const [isPaidOff, setIsPaidOff] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const [progress, setProgress] = useState({
    conformation: 0,
    pickUp: 0,
    inProgress: 0,
    shipped: 0,
    delivered: 0,
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));

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
      let paidAmount = 0;
      for (const transaction of orderObj.transactions) {
        if (transaction.status === 'pending') {
          isPending = true;
        }
        if (transaction.status === 'paid') {
          paidAmount = paidAmount + Number(transaction.amount);
        }
      }
      if (isPending) {
        setIsTransactionPending(true);
      }
      if (paidAmount >= Number(orderObj.currentTotal)) {
        setIsPaidOff(true);
      } else {
        setPendingAmount(Number(orderObj.currentTotal) - paidAmount);
      }
    }
  };

  const getNextStep = (orderObj) => {
    if (orderObj && orderObj.status === 'assigned' && orderObj.pickUpDate) {
      var date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      var date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.pickUpDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.pickUpDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.pickUpDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.pickUpDate).getDate()
      ) {
        setNextStep({
          time: `Pick Up Today ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.pickUpDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.pickUpDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.pickUpDate).getDate()
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
    } else if (orderObj && orderObj.status === 'picked-up') {
      setNextStep({
        time: `Your items are on their way to our washing facility for processing`,
        agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
      });
    } else if (orderObj && orderObj.status === 'in-progress' && !orderObj.expectedCompleteDate) {
      setNextStep({
        time: `Your items are being processed. We’ll update you with the expected finish time soon.`,
      });
    } else if (orderObj && orderObj.status === 'in-progress' && orderObj.expectedCompleteDate) {
      let date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      let date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedCompleteDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.expectedCompleteDate).getDate()
      ) {
        setNextStep({
          time: `Your items are being processed and will be ready by Today ${moment(orderObj.expectedCompleteDate).format(
            'h A'
          )}`,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.expectedCompleteDate).getDate()
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
    } else if (orderObj && orderObj.status === 'completed' && !orderObj.expectedDeliveryDate) {
      setNextStep({
        time: `Your items are ready! We’ll update you with the delivery time shortly.`,
      });
    } else if (orderObj && orderObj.status === 'completed' && orderObj.expectedDeliveryDate) {
      let date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      let date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedDeliveryDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.expectedDeliveryDate).getDate()
      ) {
        setNextStep({
          time: `Your items are ready and will be delivered by Today ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.expectedDeliveryDate).getDate()
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
    } else if (orderObj && orderObj.status === 'delivered') {
      setNextStep({
        time: `Your order has been delivered. Fresh laundry, ready to wear!`,
      });
    }
    if (orderObj) {
      if (orderObj.status === 'assigned') {
        setProgress({ conformation: 100, pickUp: 50, inProgress: 0, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'picked-up') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 25, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'in-progress') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 50, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'completed') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 100, shipped: 50, delivered: 0 });
      } else if (orderObj.status === 'delivered') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 100, shipped: 100, delivered: 100 });
      }
    }
  };

  const payOnline = async () => {
    setLoading(true);
    let isOnlinePending = false;
    for (const transaction of order.transactions) {
      if (transaction.status === 'pending' && transaction.method === 'online') {
        isOnlinePending = true;
      }
    }
    if (!isOnlinePending) {
      let orderObj = await createTransactionOrder(order.id, { method: 'online' });
      if (orderObj) {
        setOrder(orderObj);
        console.log('Success');
        setLoading(false);
        setIsPaymentDialogOpen(true);
      } else {
        setLoading(false);
      }
    } else {
      setIsPaymentDialogOpen(true);
    }
  };

  return (
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 4, sm: 8 } }}>
      {order && (
        <>
          <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: { xs: 8, sm: 6 }, pb: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                component='h2'
                variant='h4'
                sx={{ color: 'text.primary', textAlign: { xs: 'center', sm: 'left' } }}
              >
                Order ID: {order.code}
                <Typography
                  component='h6'
                  variant='subtitle1'
                  sx={{ color: 'text.neutral', textAlign: { xs: 'center', sm: 'left' } }}
                >
                  {moment(order.createdDate).format('ddd, DD MMM YYYY h:mm A')}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
                gap={1.5}
                sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
              >
                {!isPaidOff && (
                  <Button onClick={payOnline} variant='outlined' startIcon={<CreditCard />}>
                    PayNow
                  </Button>
                )}
                {(order.status === 'placed' || order.status === 'assigned') && (
                  <Button color='error' variant='outlined' startIcon={<Delete />}>
                    Cancel
                  </Button>
                )}
                <Button color='secondary' variant='outlined' startIcon={<SupportAgent />}>
                  Call Us
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              px: { xs: 1.5, sm: 3 },
              py: { xs: 2, sm: 3 },
              backgroundColor: 'actionLite.selected',
              borderRadius: '25px',
              mt: { xs: 0.5, sm: 3 },
            }}
          >
            {Boolean(nextStep) && Boolean(nextStep.time) && (
              <Box sx={{ pb: 2.5 }}>
                {Boolean(nextStep.time) && (
                  <Typography sx={{ pb: 0.5 }} variant='h5'>
                    {nextStep.time}
                  </Typography>
                )}
                {Boolean(nextStep.agent) && <Typography variant='h6'>Agent: {nextStep.agent}</Typography>}
              </Box>
            )}
            <Grid container alignItems='center' justifyContent='center' spacing={{ xs: 1.5, sm: 3 }}>
              <Grid item xs={4} sm={2.4} md={2.4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                  }}
                >
                  <EventAvailable sx={{ color: 'text.primary', fontSize: 30 }} />
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                  >
                    Conformation
                  </Typography>
                  <BorderLinearProgress variant='determinate' value={progress.conformation} />
                </Box>
              </Grid>
              <Grid item xs={4} sm={2.4} md={2.4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                  }}
                >
                  <Inventory2 sx={{ color: 'text.primary', fontSize: 30 }} />
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                  >
                    PickUp
                  </Typography>
                  <BorderLinearProgress variant='determinate' value={progress.pickUp} />
                </Box>
              </Grid>
              <Grid item xs={4} sm={2.4} md={2.4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                  }}
                >
                  <LocalLaundryService sx={{ color: 'text.primary', fontSize: 30 }} />
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                  >
                    In-Progress
                  </Typography>
                  <BorderLinearProgress variant='determinate' value={progress.inProgress} />
                </Box>
              </Grid>
              <Grid item xs={4} sm={2.4} md={2.4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                  }}
                >
                  <LocalShipping sx={{ color: 'text.primary', fontSize: 30 }} />
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                  >
                    Shipped
                  </Typography>
                  <BorderLinearProgress variant='determinate' value={progress.shipped} />
                </Box>
              </Grid>
              <Grid item xs={4} sm={2.4} md={2.4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                  }}
                >
                  <WhereToVote sx={{ color: 'text.primary', fontSize: 30 }} />
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                  >
                    Delivered
                  </Typography>
                  <BorderLinearProgress variant='determinate' value={progress.delivered} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {order.type === 'prepared' && (
            <Box
              sx={{
                px: { xs: 1.5, sm: 3 },
                py: { xs: 2, sm: 3 },
                backgroundColor: 'actionLite.selected',
                borderRadius: '25px',
                mt: { xs: 4, sm: 6 },
              }}
            >
              <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                Items
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                Your Laundry Basket
              </Typography>

              <TableContainer sx={{ display: { xs: 'none', sm: 'block' } }} component={Paper}>
                <Table sx={{ width: '100%' }} aria-label='simple table'>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>
                        <Typography variant='h6' component='h6'>
                          Item
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Quantity
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Price
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Tax
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Amount
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((itemsItem, itemsItemIndex) => (
                      <StyledTableRow key={itemsItem.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component='th' scope='row'>
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
                              src={itemsItem.pic2 || itemsItem.pic}
                              alt='new'
                            />
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                              {itemsItem.name}
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>
                            {itemsItem.service ? `${itemsItem.units}` : `${itemsItem.units} lbs`}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>
                            {itemsItem.service ? `$ ${itemsItem.currentPrice}` : `$ ${itemsItem.currentPrice} / lbs`}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>0</Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>
                            $ {(Number(itemsItem.currentPrice) * itemsItem.units).toFixed(2)}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {order.deliveryPrice > 0 && (
                      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component='th' scope='row'>
                          <Stack
                            direction='row'
                            justifyContent='flex-start'
                            alignItems='center'
                            gap={1}
                            sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                          >
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                              {getTitleCase(order.deliveryType)} Delivery
                            </Typography>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell align='right'></StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>$ {order.deliveryPrice}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>0</Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>$ {order.deliveryPrice}</Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                    <StyledTableRow>
                      <StyledTableCell align='right'>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                          Total
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                          0
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                          $ {Number(order.currentTotal).toFixed(2)}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer sx={{ display: { xs: 'block', sm: 'none' } }} component={Paper}>
                <Table sx={{ width: '100%' }} aria-label='simple table'>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>
                        <Typography variant='h6' component='h6'>
                          Item
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Tax
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography variant='h6' component='h6'>
                          Amount
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((itemsItem, itemsItemIndex) => (
                      <StyledTableRow key={itemsItem.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component='th' scope='row'>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                            {itemsItem.name}
                          </Typography>
                          <Typography variant='subtitle1'>
                            ({itemsItem.service ? `$ ${itemsItem.currentPrice}` : `$ ${itemsItem.currentPrice} / lbs`})
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>0</Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>
                            $ {(Number(itemsItem.currentPrice) * itemsItem.units).toFixed(2)}
                          </Typography>
                          <Typography variant='subtitle1'>
                            ({itemsItem.service ? `${itemsItem.units}` : `${itemsItem.units} lbs`})
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {order.deliveryPrice > 0 && (
                      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell component='th' scope='row'>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                            {getTitleCase(order.deliveryType)} Delivery
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>0</Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1'>$ {order.deliveryPrice}</Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                    <StyledTableRow>
                      <StyledTableCell align='right'>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                          Total
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                          0
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                          $ {Number(order.currentTotal).toFixed(2)}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          <Grid container alignItems='center' justifyContent='center' spacing={5} sx={{ mt: { xs: 1, sm: 1 } }}>
            <Grid item xs={12} sm={6} md={6} className='order-details-payment'>
              <Box
                sx={{
                  px: { xs: 1.5, sm: 3 },
                  py: { xs: 2, sm: 3 },
                  backgroundColor: 'actionLite.selected',
                  borderRadius: '25px',
                  mt: { xs: 0.5, sm: 3 },
                }}
              >
                <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                  Payment
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                  Final Payable Amount
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%', pr: 2 }}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      gap={1.5}
                      sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                    >
                      <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                        Subtotal
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                        $ {order.originalTotal}
                      </Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      gap={1.5}
                      sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                    >
                      <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                        Tax (13%)
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                        $ 0
                      </Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      gap={1.5}
                      sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                    >
                      <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                        Total
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                        $ {order.currentTotal}
                      </Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      gap={1.5}
                      sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                    >
                      <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                        Payment Status
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                        {isPaidOff ? 'Paid Off' : 'Pending'}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='order-details-address'>
              <Box
                sx={{
                  px: { xs: 1.5, sm: 3 },
                  py: { xs: 2, sm: 3 },
                  backgroundColor: 'actionLite.selected',
                  borderRadius: '25px',
                  mt: { xs: 0.5, sm: 3 },
                }}
              >
                <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                  Address
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                  PickUp and Delivery Details
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                    px: { xs: 1, sm: 2 },
                    py: { xs: 2, sm: 2 },
                    borderRadius: '25px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ color: 'text.secondary', pb: 1 }} variant='title'>
                      {order.address.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                      {order.address.address1}, {order.address.address2}, {order.address.city}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                      {order.address.address2}, {order.address.city}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                      {order.address.state} {order.address.zipCode}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                      <Phone sx={{ fontSize: 16 }} /> {order.address.phone}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Modal
            open={isPaymentDialogOpen}
            onClose={() => setIsPaymentDialogOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <div>
              <PayExistingOrder
                setIsPaymentDialogOpen={setIsPaymentDialogOpen}
                order={order}
                amount={pendingAmount}
                loading={false}
              ></PayExistingOrder>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default OrderDetails;
