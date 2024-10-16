import * as otpApi from "@api/otp.api";
import { IVerifyOtp } from "@interfaces/otp.interface";

class OtpService {
  async sendOtp(email: string) {
    try {
      const { data } = await otpApi.sendOtp(email);
      return data;
    } catch (error: any) {
      return { error: `${error.message}` };
    }
  }

  async verifyOtp(body: IVerifyOtp) {
    try {
      const { data } = await otpApi.verifyOtp(body);
      return data;
    } catch (error: any) {
      return { error: `${error.message}` };
    }
  }
}

export const otpService = new OtpService();
export default otpService;
