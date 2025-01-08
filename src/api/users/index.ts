import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { IUser } from "../../store/users/usersSlice";
import Endpoints from "../endpoints";

export const getAllUsersApiRequest = (): AxiosPromise<IUser[]> => {
  return axiosInstance.get(Endpoints.AUTH.ALL_USERS);
};

export const changeAdminRightApiRequest = (
  userId: number,
  value: boolean
): AxiosPromise<IUser> => {
  return axiosInstance.patch(`${Endpoints.AUTH.ALL_USERS}${userId}/`, {
    is_admin: value,
  });
};

export const deleteUserApiRequest = (userId: number): AxiosPromise<IUser> => {
  return axiosInstance.delete(`${Endpoints.AUTH.ALL_USERS}${userId}/`);
};

export const getUserInfoApiRequest = (id: number): AxiosPromise<IUser> => {
  return axiosInstance.get(`${Endpoints.AUTH.ALL_USERS}${id}/`);
};
