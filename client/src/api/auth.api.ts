import axios from "./axios.api";

export const signup = async (body: any) => axios.post("/auth/signup", body);

export const signin = async (body: any) => axios.post("/auth/signin", body);

export const verifyToken = async (
  access_token: string,
  refresh_token: string
) =>
  axios.post("/auth/verify-token", refresh_token, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export const resetPassword = async (body: any) =>
  axios.post("/auth/reset-password", body);
