import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IOwner {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IFile {
  id: number;
  file_name: string;
  file: string;
  owner: IOwner;
  unique_code: string;
  uploaded_at: string;
  comment: string;
}

export interface IFileUpdate {
  file_name: string;
  comment: string;
}

export interface IFilesState {
  allFiles: IFile[];
  files: IFile[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IFilesState = {
  allFiles: [],
  files: [],
  isLoading: false,
  error: null,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    loadFilesStart: (state: IFilesState) => ({
      ...state,
      isLoading: true,
    }),
    loadFilesSuccess: (state: IFilesState, action: PayloadAction<IFile[]>) => ({
      ...state,
      files: action.payload,
      isLoading: false,
      error: null,
    }),
    loadFilesFailure: (state: IFilesState, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    loadAllFilesSuccess: (
      state: IFilesState,
      action: PayloadAction<IFile[]>
    ) => ({
      ...state,
      allFiles: action.payload,
      isLoading: false,
      error: null,
    }),
  },
});

export const {
  loadFilesStart,
  loadFilesSuccess,
  loadFilesFailure,
  loadAllFilesSuccess,
} = filesSlice.actions;

export default filesSlice.reducer;
