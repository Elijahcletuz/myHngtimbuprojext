// import axios from 'axios';

// // Access environment variables using import.meta.env
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID;
// const APP_ID = import.meta.env.VITE_APP_ID;
// const API_KEY = import.meta.env.VITE_API_KEY;

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Authorization': `Bearer ${API_KEY}`,
//   },
// });

// export const fetchProducts = () => {
//   return axiosInstance.get('/products', {
//     params: {
//       organization_id: ORGANIZATION_ID,
//       Appid: APP_ID,
//       Apikey: API_KEY,
//     },
//   });
// };

// export const fetchCartItems = () => {
//   return axiosInstance.get('/cart', {
//     params: {
//       organization_id: ORGANIZATION_ID,
//       Appid: APP_ID,
//       Apikey: API_KEY,
//     },
//   });
// };

// export const addToCart = (product) => {
//   return axiosInstance.post('/cart', product, {
//     params: {
//       organization_id: ORGANIZATION_ID,
//       Appid: APP_ID,
//       Apikey: API_KEY,
//     },
//   });
// };

// export const updateCartItem = (itemId, quantity) => {
//   return axiosInstance.patch(`/cart/${itemId}`, { quantity }, {
//     params: {
//       organization_id: ORGANIZATION_ID,
//       Appid: APP_ID,
//       Apikey: API_KEY,
//     },
//   });
// };

// export const removeCartItem = (itemId) => {
//   return axiosInstance.delete(`/cart/${itemId}`, {
//     params: {
//       organization_id: ORGANIZATION_ID,
//       Appid: APP_ID,
//       Apikey: API_KEY,
//     },
//   });
// };

import axios from 'axios';

// Directly use the values instead of environment variables
const API_BASE_URL = 'https://app.timbu.cloud';
const ORGANIZATION_ID = '694a2073bb95454588c3757b7537c1fc';
const APP_ID = 'UB2DA63ZDK78EYX';
const API_KEY = '523f43fcb9f74960b0db86dd9c28f0f720240713013520547240';

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
