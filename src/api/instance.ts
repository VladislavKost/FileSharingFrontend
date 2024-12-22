import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import Endpoints from "./endpoints";
import { store } from "../store";
import {
  getAccessToken,
  logoutUser,
  refreshAccessToken,
} from "../store/auth/authCreators";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const urlsSkipAuth = [
  Endpoints.AUTH.LOGIN,
  Endpoints.AUTH.TOKEN_REFRESH,
  Endpoints.AUTH.LOGOUT,
  Endpoints.AUTH.REGISTRATION,
];

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }

  const accessToken = await store.dispatch(getAccessToken());

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;

    config.headers = {
      ...config.headers,
      Authorization: authorization,
    } as AxiosRequestHeaders;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const isLoggedIn = !!store.getState().auth.authData.accessToken;
    if (
      error.response?.status === 401 &&
      isLoggedIn &&
      error.request.url !== Endpoints.AUTH.LOGOUT
    ) {
      try {
        const accessToken = await store.dispatch(refreshAccessToken());
        if (accessToken) {
          const originalRequest = error.config;
          if (originalRequest) {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          }
        }
        throw error;
      } catch (refreshedError) {
        store.dispatch(logoutUser());
      }
    } else if (error.response?.status === 401 && !isLoggedIn) {
      store.dispatch(logoutUser());
    } else {
      throw error;
    }
  }
);
