export interface ISignupForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cnfPassword: string;
}

export interface ISigninForm {
  email: string;
  password: string;
}

export interface IOtpForm {
  email: string;
}
