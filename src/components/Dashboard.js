import { useEffect, useState } from 'react';
import Highlights from './Highlights';
import Services from './Services';
import FAQ from './FAQ';
import Banners from './Banners';
import BookNow from './BookNow';
import BookNowEffort from './BookNowEffort';

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
      <Banners isLoggedIn={props.isLoggedIn} tenant={tenant}></Banners>
      <Services isLoggedIn={props.isLoggedIn} services={services} servicesLoaded={servicesLoaded} />
      <BookNow isLoggedIn={props.isLoggedIn} />
      <Highlights isLoggedIn={props.isLoggedIn} />
      <BookNowEffort isLoggedIn={props.isLoggedIn} />
      <FAQ />
    </>
  );
}

export default Dashboard;
