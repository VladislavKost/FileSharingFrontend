import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFile {
  id: number;
  file_name: string;
  file: string;
  owner_id: number;
  unique_code: string;
  uploaded_at: string;
}

export interface IFilesState {
  files: IFile[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IFilesState = {
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
  },
});

export const { loadFilesStart, loadFilesSuccess, loadFilesFailure } =
  filesSlice.actions;

export default filesSlice.reducer;
