import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Box, Container, Typography } from '@mui/material';
import { getOrder } from '../utils/api_base';
import moment from 'moment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CurrentOrders from '../Modals/CurrentOrders';
import PastOrders from '../Modals/PastOrders';

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
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 } }}>
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
