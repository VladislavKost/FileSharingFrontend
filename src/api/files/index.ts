import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IFile, IFileUpdate } from "../../store/files/filesSlice";

export const getMyFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.FILES.FILES);
};

export const getUserFilesApiRequest = (id: number): AxiosPromise<IFile[]> => {
  return axiosInstance.get(`${Endpoints.FILES.USER_FILES}${id}/`);
};

export const uploadFileApiRequest = (params: FormData): AxiosPromise => {
  return axiosInstance.post(Endpoints.FILES.FILES, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.delete(`${Endpoints.FILES.FILES}${id}/`);
};

export const downloadFileApiRequest = (id: number): AxiosPromise => {
  return axiosInstance.get(`${Endpoints.FILES.FILES}${id}/`, {
    responseType: "blob",
  });
};

export const getAllFilesApiRequest = (): AxiosPromise<IFile[]> => {
  return axiosInstance.get(Endpoints.FILES.ALL_FILES);
};
export const updateFileInfoApiRequest = (
  id: number,
  data: IFileUpdate
): AxiosPromise => {
  return axiosInstance.patch(`${Endpoints.FILES.FILES}${id}/`, data);
};
