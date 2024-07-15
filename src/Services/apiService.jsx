

import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const fetchProducts = () => {
  return axiosInstance.get('/products', {
    params: {
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    },
  });
};

export const fetchCartItems = () => {
  return axiosInstance.get('/cart', {
    params: {
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    },
  });
};

export const addToCart = (product) => {
  return axiosInstance.post('/cart', product, {
    params: {
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    },
  });
};

export const updateCartItem = (itemId, quantity) => {
  return axiosInstance.patch(`/cart/${itemId}`, { quantity }, {
    params: {
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    },
  });
};

export const removeCartItem = (itemId) => {
  return axiosInstance.delete(`/cart/${itemId}`, {
    params: {
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    },
  });
};
