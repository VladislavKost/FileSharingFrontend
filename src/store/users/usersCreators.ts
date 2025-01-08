import { Dispatch } from "react";
import {
  changeAdminRightApiRequest,
  deleteUserApiRequest,
  getAllUsersApiRequest,
  getUserInfoApiRequest,
} from "../../api/users";
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
export const changeAdminRight =
  (userId: number, value: boolean) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loadUsersStart());
      await changeAdminRightApiRequest(userId, value);
      const response = await getAllUsersApiRequest();
      dispatch(loadUsersSuccess(response.data));
    } catch (error: any) {
      console.log(error);
      dispatch(loadUsersFailure(error.message));
    }
  };

export const deleteUser =
  (userId: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loadUsersStart());
      await deleteUserApiRequest(userId);
      const response = await getAllUsersApiRequest();
      dispatch(loadUsersSuccess(response.data));
    } catch (error: any) {
      console.log(error);
      dispatch(loadUsersFailure(error.message));
    }
  };

export const getUserInfo =
  (userId: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loadUsersStart());
      const response = await getUserInfoApiRequest(userId);
      return response.data;
    } catch (error: any) {
      console.log(error);
      dispatch(loadUsersFailure(error.message));
    }
  };
