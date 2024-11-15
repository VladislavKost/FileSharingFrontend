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

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const refreshToken = (): AxiosPromise<ILoginResponse> =>
  axiosInstance.get(Endpoints.AUTH.REFRESH);

export const logout = (): AxiosPromise<void> => {
  return axiosInstance.get(Endpoints.AUTH.LOGOUT);
};

export const registerUser = (
  params: IRegistrationRequest
): AxiosPromise<IRegistrationResponse> => {
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
};

export const getProfile = (): AxiosPromise<IProfileResponse> => {
  return axiosInstance.get(Endpoints.AUTH.PROFILE);
};
