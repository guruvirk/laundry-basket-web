import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { getOrder } from '../utils/api_base';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CurrentOrders from '../Modals/CurrentOrders';
import PastOrders from '../Modals/PastOrders';
import cover from '../assets/images/saloon.jpg';

function Orders(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [nextStep, setNextStep] = useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          height: { xs: '100px', sm: '180px' },
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
                Orders
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab sx={{ width: '50%' }} icon={<CheckroomIcon />} label='RECENT' iconPosition='start' />
          <Tab sx={{ width: '50%' }} icon={<AssignmentTurnedInIcon />} label='PAST' iconPosition='start' />
        </Tabs>
      </Box>
      {value === 0 ? (
        <Box>
          <CurrentOrders></CurrentOrders>
        </Box>
      ) : (
        <Box>
          <PastOrders></PastOrders>
        </Box>
      )}
    </Container>
  );
}

export default Orders;
