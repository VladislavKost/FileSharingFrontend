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
  access_token: string;
}

export interface IProfileResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  user_image: string;
}

export interface IEmailVerificationRequest {
  key: string;
}

export interface IProfileResponse {
  detail: string;
}

export interface ICheckAccessToken {
  token: string;
}
