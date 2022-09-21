import axiosRaw from "axios";
import { API } from "constants/endpoints";
import store from "state";

const axios = axiosRaw.create({
  baseURL: `${API}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const jwtInterceptor = axios.interceptors.request.use(
  (config) => {
    const token = store.getState().user.access;
    if (token && token.length > 0) {
      if (config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // eslint-disable-next-line no-param-reassign
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axios };
