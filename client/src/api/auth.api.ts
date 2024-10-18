import axios from "./axios.api";
import {
  ISignup,
  ISignin,
  IResetPassword,
  IAuthResp,
} from "@interfaces/auth.interface";
import {
  AUTH_SIGNUP,
  AUTH_SIGNIN,
  AUTH_VERIFY_TOKEN,
  AUTH_RESET_PASSWORD,
} from "@/constants/api-urls.constants";
import { AxiosResponse } from "axios";

export const signup = async (
  body: ISignup
): Promise<AxiosResponse<IAuthResp>> => axios.post(AUTH_SIGNUP, body);

export const signin = async (
  body: ISignin
): Promise<AxiosResponse<IAuthResp>> => axios.post(AUTH_SIGNIN, body);

export const verifyToken = async (
  access_token: string,
  refresh_token: string
): Promise<AxiosResponse<IAuthResp>> =>
  axios.post(
    AUTH_VERIFY_TOKEN,
    { refresh_token },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

export const resetPassword = async (
  body: IResetPassword
): Promise<AxiosResponse<IAuthResp>> => axios.post(AUTH_RESET_PASSWORD, body);
