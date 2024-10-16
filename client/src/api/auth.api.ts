import axios from "./axios.api";
import { ISignup, ISignin, IResetPassword } from "@interfaces/auth.interface";
import {
  AUTH_SIGNUP,
  AUTH_SIGNIN,
  AUTH_VERIFY_TOKEN,
  AUTH_RESET_PASSWORD,
} from "@/constants/api-urls.constants";

export const signup = async (body: ISignup) => axios.post(AUTH_SIGNUP, body);

export const signin = async (body: ISignin) => axios.post(AUTH_SIGNIN, body);

export const verifyToken = async (
  access_token: string,
  refresh_token: string
) =>
  axios.post(
    AUTH_VERIFY_TOKEN,
    { refresh_token },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

export const resetPassword = async (body: IResetPassword) =>
  axios.post(AUTH_RESET_PASSWORD, body);
