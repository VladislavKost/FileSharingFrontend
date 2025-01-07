// login

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegistrationRequest {
  username: string;
  password1: string;
  password2: string;
  email: string;
}

export interface IRegistrationResponse {
  message: {
    username: string;
    email: string;
    password1: string;
    password2: string;
    non_field_errors: string;
  };
}

export interface ILoginResponse {
  access: string;
  refresh: string;
  user: {
    pk: number;
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    user_image: string;
    is_admin: boolean;
  };
  access_expiration: string;
  refresh_expiration: string;
}

export interface IRefreshTokenResponse {
  access: string;
  access_expiration: string;
}

export interface IProfileResponse {
  pk: number;
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  user_image: string;
  is_admin: boolean;
}

export interface IEmailVerificationRequest {
  key: string;
}

export interface ICheckAccessToken {
  token: string;
}
