import { Dispatch } from "react";
import { getAllUsersApiRequest } from "../../api/users";
import {
  loadUsersFailure,
  loadUsersStart,
  loadUsersSuccess,
} from "./usersSlice";

export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(loadUsersStart());
    const response = await getAllUsersApiRequest();
    dispatch(loadUsersSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    dispatch(loadUsersFailure(error.message));
  }
};
