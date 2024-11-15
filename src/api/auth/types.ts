// login

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegistrationRequest {
  username: string;
  password: string;
  email: string;
}

export interface IRegistrationResponse {
  access_token: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IProfileResponse {
  username: string;
  email: string;
}
