export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup extends ISignin {
  confirmPassword: string;
  firstname: string;
  lastname: string;
}
