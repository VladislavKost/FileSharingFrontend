import { Dispatch } from "@reduxjs/toolkit";
import { AxiosPromise } from "axios";
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
  updateProfileStart,
  updateProfileFailure,
  updateProfileSuccess,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
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
      dispatch(loginSuccess(response.data.access_token));
      await dispatch(getProfile() as any);
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

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null;

export const getAccessToken =
  (refresh: boolean = false) =>
  async (dispatch: Dispatch<any>): Promise<string | null> => {
    try {
      const accessToken = store.getState().auth.authData.accessToken;

      if (!accessToken || refresh) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = refreshTokenApiRequest();
        }

        const res = await refreshTokenRequest;
        refreshTokenRequest = null;

        if (res) {
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
  (params: { token: string }) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await verifyAccessTokenApiRequest(params);
      await dispatch(getProfile() as any);
    } catch (error: any) {
      logoutUser();
    }
  };
