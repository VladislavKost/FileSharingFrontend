import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IFile } from "../../store/files/filesSlice";

export const getMyFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.AUTH.MY_FILES);
};
