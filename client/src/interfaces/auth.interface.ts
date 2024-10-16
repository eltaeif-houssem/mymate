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
