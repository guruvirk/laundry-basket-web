import axios from 'axios';

const URL = 'http://192.168.1.9:8080/api/';
const tenant = 'gs';

const config = {
  headers: {
    'x-tenant': tenant,
  },
};

export const getRedirectURL = async () => {
  return `${URL}webhook`;
};

export const getTenantData = async () => {
  try {
    const response = await axios.get(URL + 'tenants/' + tenant, config);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    } else {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
};

export const getServices = async (params) => {
  try {
    const response = await axios.get(URL + 'services', { ...config, params });
    if (response.data && response.data.isSuccess) {
      return response.data.page.items;
    } else {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
};

export const getItems = async (params) => {
  try {
    const response = await axios.get(URL + 'items', { ...config, params });
    if (response.data && response.data.isSuccess) {
      return response.data.page.items;
    } else {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
};
