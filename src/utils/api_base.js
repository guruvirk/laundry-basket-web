import axios from 'axios';

const URL = 'https://comfortcare.co.nz/gs/api/';
const tenant = 'gs';

const translateObj = {
  errorText: 'Error',
  invalidCredantialsError: 'Invalid Credantials',
  wrongPassword: 'Wrong Password',
  useSocialLoginError: 'Please Use Social Login',
  userDisabled: 'User Disabled',
  somethingWrongError: 'Something Went Wrong',
  invalidUserError: 'User Not Found! Please SignUp',
  userExists: 'User Already Exists! Please Login',
  invalidOtpError: 'Invalid OTP',
};

export const getError = (error) => {
  let msg = '';
  switch (error) {
    case 'INVALID_USER':
      msg = translateObj.invalidUserError;
      break;
    case 'OTP_INVALID':
      msg = translateObj.invalidOtpError;
      break;
    case 'USER_INVALID':
      msg = translateObj.invalidUserError;
      break;
    case 'PASSWORD_INVALID':
      msg = translateObj.wrongPassword;
      break;
    case 'PASSWORD_NOT_SET':
      msg = translateObj.useSocialLoginError;
      break;
    case 'USER_BLOCKED':
      msg = translateObj.userDisabled;
      break;
    case 'USER_EXISTS':
      msg = translateObj.userExists;
      break;
    default:
      msg = translateObj.somethingWrongError;
      break;
  }
  return msg;
};

const config = {
  headers: {
    'x-tenant': tenant,
  },
};

const getTokenConfig = async () => {
  let res = localStorage.getItem('user');
  if (!res) {
    return {};
  }
  const user = JSON.parse(res);
  return {
    headers: {
      Authorization: user?.session?.token,
    },
  };
};

export const getRedirectURL = async () => {
  return `${URL}webhook`;
};

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(URL + url, data, config)
        .then((response) => {
          if (response.data && response.data.isSuccess) {
            resolve(response.data.data);
          } else {
            console.error(response.data.error);
            reject(response.data.error);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          reject('Something went wrong! Try Again');
        });
    } catch (error) {
      console.error('Error fetching data:', error);
      reject('Something went wrong! Try Again');
    }
  });
};

export const updateUser = async (id, data) => {
  try {
    let config = await getTokenConfig();
    const response = await axios.put(URL + 'users/' + id, data, config);
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

export const getUser = async (id) => {
  try {
    let config = await getTokenConfig();
    const response = await axios.get(URL + 'users/' + id, config);
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
