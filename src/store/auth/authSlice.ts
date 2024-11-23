import { createSlice, Draft } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProfile {
  id: number | null;
  email: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  user_image: string | null;
}

export interface AuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
  };
  profileData: {
    profile: IProfile | null;
    isLoading: boolean;
    error: string | null;
  };
  saveProfileData: {
    isLoading: boolean;
    error: string | null;
  };
  isAuth: boolean;
}

const initialState: AuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
  },
  profileData: {
    profile: null,
    isLoading: false,
    error: null,
  },
  saveProfileData: {
    isLoading: false,
    error: null,
  },
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state: AuthState) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    loginSuccess: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
      isAuth: true,
    }),
    loginFailure: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
      isAuth: false,
    }),
    registrationStart: (state: AuthState) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    registrationSuccess: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
      isAuth: true,
    }),
    registrationFailure: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload,
      },
      isAuth: false,
    }),
    updateProfileStart: (state: AuthState) => ({
      ...state,
      saveProfileData: {
        ...state.saveProfileData,
        isLoading: true,
      },
    }),
    updateProfileSuccess: (
      state: AuthState,
      action: PayloadAction<IProfile>
    ) => ({
      ...state,
      saveProfileData: {
        ...state.saveProfileData,
        isLoading: false,
        error: null,
      },
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
      isAuth: true,
    }),
    updateProfileFailure: (
      state: AuthState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      saveProfileData: {
        ...state.saveProfileData,
        isLoading: false,
        error: action.payload,
      },
      isAuth: false,
    }),
    loadProfileStart: (state: AuthState) => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    loadProfileSuccess: (
      state: AuthState,
      action: PayloadAction<IProfile>
    ) => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadProfileFailure: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (state: AuthState) => initialState,
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutSuccess,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  registrationStart,
  registrationSuccess,
  registrationFailure,
} = authSlice.actions;

export default authSlice.reducer;
