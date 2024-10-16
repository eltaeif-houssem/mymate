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
  otp: number;
}

export interface IAuthResp {
  data: any;
  access_token: string;
  refresh_token: string;
}
