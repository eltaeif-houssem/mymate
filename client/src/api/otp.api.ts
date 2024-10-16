import axios from "./axios.api";
import { IVerifyOtp } from "@interfaces/otp.interface";

export const sendOtp = async (email: string) =>
  axios.post("/otp/send-otp", { email });

export const verifyOtp = async (body: IVerifyOtp) =>
  axios.post("/otp/verify-otp", body);
