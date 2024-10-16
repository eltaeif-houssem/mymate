import axios from "./axios.api";
import { IVerifyOtp } from "@interfaces/otp.interface";
import { OTP_SEND, OTP_VERIFY } from "@/constants/api-urls.constants";

export const sendOtp = async (email: string) => axios.post(OTP_SEND, { email });

export const verifyOtp = async (body: IVerifyOtp) =>
  axios.post(OTP_VERIFY, body);
