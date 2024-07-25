import { useEffect, useState } from 'react';
import Highlights from './Highlights';
import Services from './Services';
import Features from './Features';
import FAQ from './FAQ';
import Banners from './Banners';

function Dashboard(props) {
  const [tenant, setTenant] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant]);

  return (
    <>
      <Banners tenant={tenant}></Banners>
      <Features />
      <Highlights />
      <Services services={services} servicesLoaded={servicesLoaded} />
      <FAQ />
    </>
  );
}

export default Dashboard;
