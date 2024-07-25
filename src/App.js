import { Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import { getItems, getServices, getTenantData } from './utils/api_base';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const navRef = useRef();

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
  }, []);

  useEffect(() => {
    getServicesData();
  }, []);

  const getServicesData = async () => {
    let servicesData = await getServices({ category: 'Laundry Basket' });
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

  const _retriveData = () => {
    let res = localStorage.getItem('user');
    if (!res) {
      setIsLoggedIn(false);
    }
    const user = JSON.parse(res);
    if (user && user.name && user.addresses && user.addresses.length) {
      setUser(user);
      setIsLoggedIn(true);
    } else {
      if (user && (!user.name || !user.addresses || !user.addresses.length)) {
        // setIsLoggedIn(false);
        setUser(user);
        setIsLoggedIn(true);
        // navRef.current.navigate('/signup');
      }
    }
  };

  useEffect(() => {
    setInterval(() => {
      _retriveData();
    }, 5000);
    setTimeout(() => {
      _retriveData();
    });
  }, []);

  return (
    <BrowserRouter ref={navRef}>
      <ThemeProvider theme={LPtheme}>
        <AppAppBar isLoggedIn={isLoggedIn} user={user} mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ bgcolor: 'background.default' }}>
          <Routes>
            <Route path='/' element={<Dashboard tenant={tenant} services={services} servicesLoaded={servicesLoaded} />} />
            <Route path='/login' element={<Login tenant={tenant} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
