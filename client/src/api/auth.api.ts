import axios from "./axios.api";
import { ISignup, ISignin, IResetPassword } from "@interfaces/auth.interface";

export const signup = async (body: ISignup) => axios.post("/auth/signup", body);

export const signin = async (body: ISignin) => axios.post("/auth/signin", body);

export const verifyToken = async (
  access_token: string,
  refresh_token: string
) =>
  axios.post("/auth/verify-token", refresh_token, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export const resetPassword = async (body: IResetPassword) =>
  axios.post("/auth/reset-password", body);
