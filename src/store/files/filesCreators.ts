import { Dispatch } from "redux";
import {
  deleteFileApiRequest,
  downloadFileApiRequest,
  getAllFilesApiRequest,
  getMyFilesApiRequest,
  uploadFileApiRequest,
  updateFileInfoApiRequest,
} from "../../api/files";
import {
  loadFilesFailure,
  loadFilesStart,
  loadFilesSuccess,
  loadAllFilesSuccess,
  IFileUpdate,
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

const decodeMimeString = (mimeString: string): string => {
  const mimeRegex = /=\?([\w-]+)\?([Bb])\?([^?]+)\?=/g;
  const decodedStringFunction = (
    match: string,
    charset: string,
    encoding: string,
    encoded: string
  ): string => {
    if (encoding === "B") {
      return window.atob(encoded);
    }
    return decodeURIComponent(escape(window.atob(encoded)));
  };
  return mimeString.replace(mimeRegex, decodedStringFunction);
};

const getFileName = (contentDisposition: string) => {
  const correctName = decodeMimeString(contentDisposition);
  debugger;
  const regex = /filename=([^"]+)/;
  const match = correctName.match(regex);
  return match ? match[1] : "UnknownName.txt";
};

export const downloadFile = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await downloadFileApiRequest(id);
    const contentDisposition = response.headers["content-disposition"];
    const fileName = getFileName(contentDisposition);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    console.log(error);
  }
};
export const getAllFiles = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadFilesStart());
    const response = await getAllFilesApiRequest();
    dispatch(loadAllFilesSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    dispatch(loadFilesFailure(error.message));
  }
};

export const updateFileInfo =
  (id: number, data: IFileUpdate) => async (dispatch: Dispatch) => {
    try {
      await updateFileInfoApiRequest(id, data);
      dispatch(getMyFiles() as any);
      dispatch(getAllFiles() as any);
    } catch (error: any) {
      console.log(error);
    }
  };
