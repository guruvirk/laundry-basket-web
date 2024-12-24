import { Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import { getItems, getServices, getTenantData, getUser } from './utils/api_base';
import Dashboard from './components/Dashboard';
import StickyFooter from './components/Footer';
import SignUp from './components/SignUp';
import MyAddresses from './components/MyAddresses';
import Profile from './components/Profile';
import Pricing from './components/Pricing';
import BookOrder from './components/BookOrder';
import OrderDetails from './components/OrderDetails';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));
  const [tenant, setTenant] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    getTenant();
    getServicesData();
  }, []);

  const getServicesData = async () => {
    let servicesData = await getServices({ category: 'laundry' });
    if (servicesData) {
      servicesData.forEach((service, index) => {
        getItems({ service: service.id }).then((items) => {
          if (items) {
            servicesData[index].items = items;
          }
          setServices(servicesData);
        });
      });
      setServices(servicesData);
      setServicesLoaded(true);
      console.log('App Services Loaded');
    }
  };

  const getTenant = async () => {
    let tenantObj = await getTenantData();
    if (tenantObj) {
      setTenant(tenantObj);
    }
  };

  const _retriveData = async () => {
    let res = localStorage.getItem('user');
    if (!res) {
      setIsLoggedIn(false);
    }
    const user = JSON.parse(res);
    if (user && user.name && user.addresses && user.addresses.length) {
      setUser(user);
      setIsLoggedIn(true);
      let userResp = await getUser('my');
      if (userResp) {
        localStorage.setItem('user', JSON.stringify({ ...userResp, session: user.session }));
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const updateUserInfo = setInterval(() => {
      _retriveData();
    }, 10000);
    setTimeout(() => {
      _retriveData();
    });
    return () => clearInterval(updateUserInfo);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={LPtheme}>
        <AppAppBar isLoggedIn={isLoggedIn} user={user} mode={mode} toggleColorMode={toggleColorMode} logout={logout} />
        <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path='/' element={<Dashboard tenant={tenant} services={services} servicesLoaded={servicesLoaded} />} />
            <Route
              path='/pricing'
              element={<Pricing tenant={tenant} services={services} servicesLoaded={servicesLoaded} />}
            />
            <Route
              path='/book-order'
              element={<BookOrder isLoggedIn={isLoggedIn} services={services} servicesLoaded={servicesLoaded} user={user} />}
            />
            <Route path='/login' element={<SignUp tenant={tenant} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route
              path='/my-addresses'
              element={<MyAddresses isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} />}
            />
            <Route
              path='/my-profile'
              element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} />}
            />
            <Route
              path='/orders/:id'
              element={<OrderDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} user={user} />}
            />
          </Routes>
        </Box>
        <StickyFooter></StickyFooter>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
