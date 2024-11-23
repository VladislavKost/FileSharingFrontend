import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import {
  ILoginRequest,
  ILoginResponse,
  IProfileResponse,
  IRegistrationRequest,
  IRegistrationResponse,
} from "./types";

export const loginApiRequest = (
  params: ILoginRequest
): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const refreshTokenApiRequest = (): AxiosPromise<ILoginResponse> =>
  axiosInstance.get(Endpoints.AUTH.REFRESH);

export const logoutApiRequest = (): AxiosPromise<void> => {
  return axiosInstance.get(Endpoints.AUTH.LOGOUT);
};

export const registerUserApiRequest = (
  params: IRegistrationRequest
): AxiosPromise<IRegistrationResponse> => {
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
};

export const changeProfileInfoApiRequest = (
  params: FormData
): AxiosPromise<IProfileResponse> => {
  return axiosInstance.put(Endpoints.AUTH.PROFILE, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProfileApiRequest = (): AxiosPromise<IProfileResponse> => {
  return axiosInstance.get(Endpoints.AUTH.PROFILE);
};
