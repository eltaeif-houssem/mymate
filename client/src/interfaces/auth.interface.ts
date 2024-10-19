import { IUser } from "./user.interface";

export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup extends ISignin {
  firstname: string;
  lastname: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  otp: string;
}

export interface IAuthResp {
  data: IUser;
  access_token: string;
  refresh_token: string;
}
