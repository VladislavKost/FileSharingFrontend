import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { IUser } from "../../store/users/usersSlice";
import Endpoints from "../endpoints";

export const getAllUsersApiRequest = (): AxiosPromise<IUser[]> => {
  return axiosInstance.get(Endpoints.AUTH.ALL_USERS);
};
