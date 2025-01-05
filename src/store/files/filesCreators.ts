import { Dispatch } from "redux";
import {
  deleteFileApiRequest,
  downloadFileApiRequest,
  getMyFilesApiRequest,
  uploadFileApiRequest,
} from "../../api/files";
import {
  loadFilesFailure,
  loadFilesStart,
  loadFilesSuccess,
} from "./filesSlice";

export const getMyFiles = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadFilesStart());
    const response = await getMyFilesApiRequest();
    dispatch(loadFilesSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    dispatch(loadFilesFailure(error.message));
  }
};

export const uploadFile = (data: FormData) => async (dispatch: Dispatch) => {
  try {
    await uploadFileApiRequest(data);
    dispatch(getMyFiles() as any);
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteFile = (id: number) => async (dispatch: Dispatch) => {
  try {
    await deleteFileApiRequest(id);
    dispatch(getMyFiles() as any);
  } catch (error: any) {
    console.log(error);
  }
};

export const downloadFile =
  (id: number, filename: string) => async (dispatch: Dispatch) => {
    try {
      const response = await downloadFileApiRequest(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.log(error);
    }
  };
