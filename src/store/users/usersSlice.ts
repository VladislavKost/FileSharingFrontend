import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  pk: string;
  email: string;
  first_name: string;
  last_name: string;
  user_image: string;
  gender: string;
  username: string;
  is_admin: boolean;
  files_amount: number;
  files_size: number;
}

export interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsersStart: (state: IUsersState) => ({
      ...state,
      isLoading: true,
    }),
    loadUsersSuccess: (state: IUsersState, action: PayloadAction<IUser[]>) => ({
      ...state,
      users: action.payload,
      isLoading: false,
      error: null,
    }),
    loadUsersFailure: (state: IUsersState, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const { loadUsersStart, loadUsersSuccess, loadUsersFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
