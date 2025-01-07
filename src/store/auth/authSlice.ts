import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse } from "../../api/auth/types";

export interface IProfile {
  pk: number | null;
  id: number | null;
  email: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  user_image: string | null;
  is_admin: boolean;
}

export interface IRegistrationFormErrors {
  username: string;
  email: string;
  password1: string;
  password2: string;
  non_field_errors: string;
}

export interface IRegistrationResponse {
  username: string;
  email: string;
  password1: string;
  password2: string;
  non_field_errors: string;
}

export interface AuthState {
  authData: {
    accessToken: string | null;
    accessExpiration: string | null;
    isLoading: boolean;
    error: string | { non_field_errors: string } | null;
  };
  registrationData: {
    isLoading: boolean;
    success: boolean;
    error: {
      username: string;
      email: string;
      password1: string;
      password2: string;
      non_field_errors: string;
    } | null;
  };
  verifyEmailData: {
    isLoading: boolean;
    success: boolean;
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
    accessExpiration: null,
    isLoading: false,
    error: null,
  },
  registrationData: {
    isLoading: false,
    success: false,
    error: {
      username: "",
      email: "",
      password1: "",
      password2: "",
      non_field_errors: "",
    },
  },
  verifyEmailData: {
    isLoading: false,
    success: false,
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
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<ILoginResponse>
    ) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload.access,
        accessExpiration: action.payload.access_expiration,
        isLoading: false,
        error: null,
      },
      isAuth: true,
      profileData: {
        ...state.profileData,
        profile: {
          ...state.profileData.profile,
          ...action.payload.user,
        },
      },
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
      registrationData: {
        ...state.registrationData,
        isLoading: true,
      },
    }),
    registrationSuccess: (state: AuthState) => ({
      ...state,
      registrationData: {
        ...state.registrationData,
        success: true,
        isLoading: false,
        error: null,
      },
    }),
    registrationFailure: (
      state: AuthState,
      action: PayloadAction<IRegistrationResponse>
    ) => ({
      ...state,
      registrationData: {
        ...state.registrationData,
        success: false,
        isLoading: false,
        error: action.payload,
      },
    }),
    registrationFormError: (
      state: AuthState,
      action: PayloadAction<IRegistrationFormErrors>
    ) => ({
      ...state,
      registrationData: {
        ...state.registrationData,
        error: action.payload,
      },
    }),
    verifyEmailStart: (state: AuthState) => ({
      ...state,
      verifyEmailData: {
        ...state.verifyEmailData,
        isLoading: true,
      },
    }),
    verifyEmailSuccess: (state: AuthState) => ({
      ...state,
      verifyEmailData: {
        isLoading: false,
        success: true,
        error: null,
      },
    }),
    verifyEmailFailure: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      verifyEmailData: {
        ...state.verifyEmailData,
        isLoading: false,
        error: action.payload,
      },
    }),
    getProfileStart: (state: AuthState) => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    getProfileSuccess: (state: AuthState, action: PayloadAction<IProfile>) => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
      isAuth: true,
    }),
    getProfileFailure: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      profileData: {
        ...state.profileData,
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
    refreshTokenSuccess: (
      state: AuthState,
      action: PayloadAction<{ access: string; access_expiration: string }>
    ) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload.access,
        accessExpiration: action.payload.access_expiration,
      },
      isAuth: true,
    }),
    refreshTokenFailure: (state: AuthState) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: null,
        accessExpiration: null,
      },
      isAuth: false,
    }),
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
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
} = authSlice.actions;

export default authSlice.reducer;
