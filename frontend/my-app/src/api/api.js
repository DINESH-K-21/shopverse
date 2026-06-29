import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API,
});

const attachAuthToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleRequestError = (error) => Promise.reject(error);

api.interceptors.request.use(attachAuthToken, handleRequestError);
productApi.interceptors.request.use(attachAuthToken, handleRequestError);
