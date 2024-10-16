import axios from "./axios.api";

export const sendOtp = async (email: string) =>
  axios.post("/otp/send-otp", { email });

export const verifyOtp = async (body: any) =>
  axios.post("/otp/verify-otp", body);
