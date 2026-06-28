import axios from "axios";


 export const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API,
});

console.log(import.meta.env.VITE_AUTH_API);
console.log(import.meta.env.VITE_PRODUCT_API);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
