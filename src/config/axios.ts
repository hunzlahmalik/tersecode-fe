import axiosRaw from "axios";
import { API } from "constants/endpoints";
import store from "state";
import { logOut } from "state/actions";
import { refreshTokenWithToast } from "state/user/actions";

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
    return Promise.reject(error);
  }
);

export const removeJwtInterceptor = () => {
  axios.interceptors.request.eject(jwtInterceptor);
};

export const refreshInterceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // store.dispatch({ type: "LOGOUT" });
      if (error.response.data.code === "token_not_valid") {
        console.error("token not valid");
        const promise = refreshTokenWithToast(store.dispatch, {
          refresh: store.getState().user.refresh,
        });
        promise
          .then(() => {
            return axios.request(error.config);
          })
          .catch(() => {
            store.dispatch(logOut);
          });
      }
    }
    return Promise.reject(error);
  }
);

export { axios };
