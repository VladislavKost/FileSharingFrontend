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
  IProfile,
  updateProfileStart,
  updateProfileFailure,
  updateProfileSuccess,
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
      console.log(error);
      dispatch(loginFailure(error.message));
    }
  };

export const registerUser =
  (data: IRegistrationRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(registrationStart());
      const response = await registerUserApiRequest(data);
      dispatch(registrationSuccess(response.data.access_token));
      await dispatch(getProfile() as any);
    } catch (error: any) {
      console.log(error);
      dispatch(registrationFailure(error.message));
    }
  };

export const changeUserProfileInfo =
  (data: IProfile) => async (dispatch: Dispatch) => {
    try {
      dispatch(updateProfileStart());
      const response = await changeProfileInfoApiRequest(data);
      dispatch(updateProfileSuccess(response.data));
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
