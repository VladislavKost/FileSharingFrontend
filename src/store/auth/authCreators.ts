import { Dispatch } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResponse,
  IRegistrationRequest,
} from "../../api/auth/types";
import {
  loadProfileFailure,
  loadProfileStart,
  loadProfileSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registrationStart,
  registrationFailure,
  registrationSuccess,
} from "./authSlice";
import api from "../../api";
import { history } from "../../utils/history";
import { AxiosPromise } from "axios";
import { store } from "..";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const response = await api.auth.login(data);
      dispatch(loginSuccess(response.data.access_token));
      await dispatch(getProfile() as any);
    } catch (error: any) {
      console.log(error);
      dispatch(loginFailure(error.message));
    }
  };

export const registerUser =
  (data: IRegistrationRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(registrationStart());
      const response = await api.auth.registerUser(data);
      dispatch(registrationSuccess(response.data.access_token));
      await dispatch(getProfile() as any);
    } catch (error: any) {
      console.log(error);
      dispatch(registrationFailure(error.message));
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.auth.logout();
      dispatch(logoutSuccess());
      history.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

export const getProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadProfileStart());

    const response = await api.auth.getProfile();
    const data = response.data;
    dispatch(loadProfileSuccess(data));
  } catch (error: any) {
    console.log(error);
    dispatch(loadProfileFailure(error.message));
  }
};

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null;

export const getAccessToken =
  (refresh: boolean = false) =>
  async (dispatch: Dispatch<any>): Promise<string | null> => {
    try {
      const accessToken = store.getState().auth.authData.accessToken;

      if (!accessToken || refresh) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = api.auth.refreshToken();
        }

        const res = await refreshTokenRequest;
        refreshTokenRequest = null;

        if (res.data.access_token) {
          dispatch(loginSuccess(res.data.access_token));
          return res.data.access_token;
        }
      }

      return accessToken;
    } catch (e) {
      console.error(e);

      return null;
    }
  };
