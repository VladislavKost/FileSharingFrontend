import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IFile, IFileUpdate } from "../../store/files/filesSlice";

export const getMyFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.AUTH.FILES);
};

export const getUserFilesApiRequest = (id: number): AxiosPromise<IFile[]> => {
  return axiosInstance.get(`${Endpoints.AUTH.USER_FILES}${id}/`);
};

export const uploadFileApiRequest = (params: FormData): AxiosPromise => {
  return axiosInstance.post(Endpoints.AUTH.FILES, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.delete(`${Endpoints.AUTH.FILES}${id}/`);
};

export const downloadFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.get(`${Endpoints.AUTH.FILES}${id}/`, {
    responseType: "blob",
  });
};

export const getAllFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.AUTH.ALL_FILES);
};
export const updateFileInfoApiRequest = (
  id: number,
  data: IFileUpdate
): AxiosPromise => {
  return axiosInstance.patch(`${Endpoints.AUTH.FILES}${id}/`, data);
};
