import { Dispatch } from "redux";
import { getMyFilesApiRequest } from "../../api/files";
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
