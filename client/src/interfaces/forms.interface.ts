import { ISignin } from "./auth.interface";
import { IVerifyOtp } from "./otp.interface";

export interface ISignupForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cnfPassword: string;
}

export interface ISigninForm extends ISignin {}

export interface ISendOtpForm {
  email: string;
}

export interface IVerifyOtpForm extends IVerifyOtp {}
