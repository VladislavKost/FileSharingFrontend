import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import {
  ICheckAccessToken,
  IEmailVerificationRequest,
  ILoginRequest,
  ILoginResponse,
  IProfileResponse,
  IRegistrationRequest,
  IRegistrationResponse,
  IRefreshTokenResponse,
} from "./types";

export const loginApiRequest = (
  params: ILoginRequest
): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const refreshTokenApiRequest = (): AxiosPromise<IRefreshTokenResponse> =>
  axiosInstance.post(Endpoints.AUTH.TOKEN_REFRESH);

export const logoutApiRequest = (): AxiosPromise<void> => {
  return axiosInstance.post(Endpoints.AUTH.LOGOUT);
};

export const registerUserApiRequest = (
  params: IRegistrationRequest
): AxiosPromise<IRegistrationResponse> => {
  return axiosInstance.post(Endpoints.AUTH.REGISTRATION, params);
};

export const changeProfileInfoApiRequest = (
  params: FormData
): AxiosPromise<IProfileResponse> => {
  return axiosInstance.patch(Endpoints.AUTH.PROFILE, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProfileApiRequest = (): AxiosPromise<IProfileResponse> => {
  return axiosInstance.get(Endpoints.AUTH.PROFILE);
};

export const changeProfilePasswordApiRequest = (
  params: FormData
): AxiosPromise<IProfileResponse> => {
  return axiosInstance.patch(Endpoints.AUTH.CHANGE_PASSWORD, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const verifyEmailApiRequest = (
  params: IEmailVerificationRequest
): AxiosPromise<IProfileResponse> => {
  return axiosInstance.post(
    Endpoints.AUTH.REGISTRATION_EMAIL_VERIFICATION,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const verifyAccessTokenApiRequest = (params: ICheckAccessToken) => {
  return axiosInstance.post(Endpoints.AUTH.TOKEN_VERIFY, params);
};
