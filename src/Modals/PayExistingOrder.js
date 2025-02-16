import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrder, createTransactionOrder } from '../utils/api_base';

const modalStyle = {
  position: 'absolute',
  width: { xs: '90%', sm: '50%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  px: 4,
  py: 2,
  textAlign: 'center',
};

const CheckoutForm = forwardRef((props, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useImperativeHandle(ref, () => ({
    initiate() {
      initiatePayment();
    },
    initiatePaymentWithOrder(order) {
      initiatePaymentWithOrder(order);
    },
  }));

  const initiatePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    let client_secret = '';
    for (const transaction of props.order.transactions) {
      if (transaction.status === 'pending') {
        client_secret = transaction.paymentIntent.client_secret;
      }
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(submitError);
      setErrorMessage(submitError);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: 'https://laundrybasket.ca/orders/' + props.order.id,
      },
    });

    if (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } else {
      console.log('Payment Presented');
    }

    setIsLoading(false);
  };

  const initiatePaymentWithOrder = async (order) => {
    let client_secret = '';
    for (const transaction of order.transactions) {
      if (transaction.status === 'pending') {
        client_secret = transaction.paymentIntent.client_secret;
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: 'http://localhost:3000/#/pricing/order/' + order.id,
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log('Payment Presented');
    }
  };

  return (
    <form id='payment-form' onSubmit={initiatePayment}>
      <PaymentElement />
      <Button
        type='submit'
        disabled={!stripe || !elements || props.loading || isLoading}
        id='submit'
        sx={{ mt: 2, px: 4 }}
        variant='contained'
      >
        {props.loading || isLoading ? (
          <CircularProgress size={25} color='inherit' />
        ) : (
          <Typography variant='subtitle1'>Confirm</Typography>
        )}
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
});

function PayExistingOrder(props) {
  const stripePromise = loadStripe(
    'pk_test_51PetyERvTTZKLOfQCuI24pdifvFPOtYUmZZTE5eUkMYRpJmB7l7QboFCFg4ZjT3sKxYTQe1g1VehnhxsUqLuDOrh00DOyGLkEU'
  );

  const childRef = useRef();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [order, setOrder] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe',
  };
  const loader = 'auto';

  useEffect(() => {
    if (props.order) {
      setOrder(props.order);
      setAmount(props.amount);
      for (const transaction of props.order.transactions) {
        if (transaction.status === 'pending' && transaction.method === 'online') {
          setClientSecret(transaction.paymentIntent.client_secret);
        }
      }
    }
  }, []);

  return (
    <>
      {clientSecret ? (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <Box sx={modalStyle}>
            <IconButton
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={() => props.setIsPaymentDialogOpen(false)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zindex: 999,
              }}
              aria-label='delete'
              size='large'
            >
              <ArrowBackIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Typography sx={{ mt: 1, mb: 2, color: 'text.primary' }} variant='h6' textAlign='center'>
              Payment  ($ {props.amount})
            </Typography>
            <CheckoutForm orderObj={order} ref={childRef} loading={loading} />
          </Box>
        </Elements>
      ) : (
        <Typography sx={{ my: 1, color: 'text.primary' }} variant='h6' textAlign='center'>
          Loading
        </Typography>
      )}
    </>
  );
}

export default PayExistingOrder;
