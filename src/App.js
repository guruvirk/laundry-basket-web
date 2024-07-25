import { Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import { getItems, getServices, getTenantData } from './utils/api_base';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));

  const [tenant, setTenant] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

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
    servicesData.forEach((service, index) => {
      getItems({ service: service.id }).then((items) => {
        servicesData[index].items = items;
        setServices(servicesData);
      });
    });
    setServices(servicesData);
    setServicesLoaded(true);
    console.log('App Services Loaded');
  };

  const getTenant = async () => {
    let tenantObj = await getTenantData();
    if (tenantObj) {
      setTenant(tenantObj);
    }
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={LPtheme}>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ bgcolor: 'background.default' }}>
          <Routes>
            <Route path='/' element={<Dashboard tenant={tenant} services={services} servicesLoaded={servicesLoaded} />} />
            <Route path='/login' element={<Login tenant={tenant} />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
