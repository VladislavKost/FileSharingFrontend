import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IFile } from "../../store/files/filesSlice";

export const getMyFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.AUTH.MY_FILES);
};

export const uploadFileApiRequest = (params: FormData): AxiosPromise => {
  return axiosInstance.post(Endpoints.AUTH.MY_FILES, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.delete(`${Endpoints.AUTH.MY_FILES}${id}/`);
};

export const downloadFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.get(`${Endpoints.AUTH.MY_FILES}${id}/`, {
    responseType: "blob",
  });
};
