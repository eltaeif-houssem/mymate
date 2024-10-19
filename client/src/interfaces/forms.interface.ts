import { ISignin, ISignup, IResetPassword } from "./auth.interface";
import { IVerifyOtp } from "./otp.interface";

export interface ISignupForm extends ISignup {
  cnfPassword: string;
}

export interface ISigninForm extends ISignin {}

export interface ISendOtpForm {
  email: string;
}

export interface IVerifyOtpForm extends IVerifyOtp {}

export interface IResetPasswordForm extends IResetPassword {
  password: string;
  cnfPassword: string;
}
