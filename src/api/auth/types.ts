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
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  user_image: string;
}
