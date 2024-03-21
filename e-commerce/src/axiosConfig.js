import axios from "axios";

const baseURL = process.env.REACT_APP_API_END_POINT;

export const AxiosConfig = axios.create({
  baseURL,
});
export const AxiosConfigWithoutInterceptor = axios.create({
  baseURL,
});

AxiosConfig.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    // console.log("tok interceptor", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
