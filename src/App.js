import { Box, Divider, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Banners from './components/Banners';
import { getTenantData } from './utils/api_base';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));

  const [tenant, setTenant] = useState({});

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    getTenant();
  }, []);

  const getTenant = async () => {
    let tenantObj = await getTenantData();
    if (tenantObj) {
      setTenant(tenantObj);
    }
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Banners tenant={tenant}></Banners>
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
