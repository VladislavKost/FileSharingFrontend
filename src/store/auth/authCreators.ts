import { Dispatch } from "@reduxjs/toolkit";
import { AxiosPromise } from "axios";
import { ILoginRequest, IRegistrationRequest } from "../../api/auth/types";
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
  updateProfileStart,
  updateProfileFailure,
  updateProfileSuccess,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
} from "./authSlice";
import { history } from "../../utils/history";
import { store } from "..";
import {
  changeProfileInfoApiRequest,
  getProfileApiRequest,
  loginApiRequest,
  logoutApiRequest,
  refreshTokenApiRequest,
  registerUserApiRequest,
  changeProfilePasswordApiRequest,
  verifyEmailApiRequest,
  verifyAccessTokenApiRequest,
} from "../../api/auth";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const response = await loginApiRequest(data);
      dispatch(loginSuccess(response.data));
    } catch (error: any) {
      dispatch(loginFailure(error.response.data));
    }
  };
export const registerUser =
  (data: IRegistrationRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(registrationStart());
      await registerUserApiRequest(data);
      dispatch(registrationSuccess());
    } catch (error: any) {
      dispatch(registrationFailure(error.response.data));
    }
  };

export const changeUserProfileInfo =
  (data: FormData) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateProfileStart());
      const response = await changeProfileInfoApiRequest(data);
      dispatch(updateProfileSuccess(response.data));
      await dispatch(getProfile() as any);
    } catch (error: any) {
      console.log(error);
      dispatch(updateProfileFailure(error.message));
    }
  };

export const changeUserPassword =
  (data: FormData) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateProfileStart());
      const response = await changeProfilePasswordApiRequest(data);
      dispatch(updateProfileSuccess(response.data));
      await dispatch(getProfile() as any);
    } catch (error: any) {
      console.log(error);
      dispatch(updateProfileFailure(error.message));
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await logoutApiRequest();
      dispatch(logoutSuccess());
      history.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

export const getProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadProfileStart());
    const response = await getProfileApiRequest();
    dispatch(loadProfileSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    dispatch(loadProfileFailure(error.message));
  }
};

export const getAccessToken =
  () =>
  async (dispatch: Dispatch): Promise<string | null> => {
    try {
      let accessToken = store.getState().auth.authData.accessToken;

      if (!accessToken) {
        const refreshTokenRequest = await dispatch(refreshAccessToken() as any);
        if (refreshTokenRequest !== undefined) {
          accessToken = refreshTokenRequest;
        }
      }
      return accessToken;
    } catch (e) {
      console.error("Error getting access token:", e);
      return null;
    }
  };

export const verifyEmail =
  (data: { key: string }) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(verifyEmailStart());
      await verifyEmailApiRequest(data);
      dispatch(verifyEmailSuccess());
    } catch (error: any) {
      dispatch(verifyEmailFailure(error.response.data));
    }
  };

export const verifyAccessToken =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const accessToken = store.getState().auth.authData.accessToken;
      if (accessToken) {
        await verifyAccessTokenApiRequest({ token: accessToken });
        await dispatch(getProfile() as any);
      }
    } catch (error: any) {
      logoutUser();
    }
  };

export const refreshAccessToken =
  () =>
  async (dispatch: Dispatch): Promise<string | undefined> => {
    try {
      const refreshToken = await refreshTokenApiRequest();
      if (refreshToken && refreshToken.data && refreshToken.data.access) {
        dispatch(refreshTokenSuccess(refreshToken.data));
        dispatch(getProfile() as any);
        return refreshToken.data.access;
      } else {
        logoutUser();
      }
    } catch (error) {
      dispatch(refreshTokenFailure());
      logoutUser();
      return undefined;
    }
  };
