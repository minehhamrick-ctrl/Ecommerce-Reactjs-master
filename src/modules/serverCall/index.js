import axios from 'axios';
import qs from 'qs';

import Auth from '../Auth';
import jumpTo from '../Navigation';
import paypalConfig from '../../configs/paypalConfig';

const URL = 'https://zack-ecommerce-nodejs.herokuapp.com';
// const URL = 'http://localhost:4000';

const NETWORK_ERROR_STATUS = 500;
const UNAUTHORIZED_STATUS = 401;

/**
 * Handles API responses and common request errors.
 */
const handleResponseError = (error) => {
  if (!error.response) {
    error.response = {
      data: 'net work error',
      status: NETWORK_ERROR_STATUS
    };
  }

  if (error.response.status === UNAUTHORIZED_STATUS) {
    Auth.logout();
    jumpTo('/login');
    throw error;
  }

  return Promise.reject(error);
};

/**
 * Makes requests to the application server.
 */
const serverCall = (config) => {
  const requestConfig = config;

  // Add authorization header when a user is authenticated
  if (Auth.user_token) {
    const token = Auth.getToken();

    requestConfig.headers = {
      authorization: token
    };
  }

  // Handle network and authorization errors
  axios.interceptors.response.use(
    (response) => response,
    handleResponseError
  );

  requestConfig.baseURL = URL;

  return axios(requestConfig);
};

export default serverCall;

/**
 * Authenticate user and save the returned user token.
 */
export const login = (email, password) => {
  const body = {
    credential: {
      email,
      password
    }
  };

  return serverCall({
    method: 'POST',
    url: '/users/login',
    data: body
  }).then((res) => {
    Auth.setUserToken(res.data.user_token);

    return res;
  });
};

/**
 * Retrieve an OAuth token from the PayPal sandbox.
 */
export const getPaypalToken = () => {
  const credentials = {
    username: paypalConfig.username,
    password: paypalConfig.password
  };

  const tokenData = qs.stringify({
    grant_type: 'client_credentials'
  });

  return axios({
    method: 'POST',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    auth: credentials,
    data: tokenData
  });
};