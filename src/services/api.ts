import {BASE_URL} from '@env';
import axios from 'axios';
import {TIMEOUT} from './constants';
import storage, {storageKeys} from './storage';

// Create an instance of axios with a base URL
const Axios = axios.create({
  baseURL: BASE_URL, // Replace with your base URL
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'App-version': '2.14.62',
    'content-type': 'application/json',
    Tenant: 'General',
  },
  timeout: TIMEOUT,
});

// Interceptor to add auth header if auth key is present
// const blacklistToken = [];

// Request interceptor for adding headers, logging, etc.
Axios.interceptors.request.use(
  config => {
    const token = storage.get(storageKeys.token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  async error => await Promise.reject(error),
);

export default Axios;
