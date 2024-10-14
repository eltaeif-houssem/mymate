import Otp from "@models/otp.model";
import { generateOTP } from "@utils/email.util";

class OtpService {
  async createOtp(uid: string) {
    const otp = generateOTP();
    await Otp.create({
      otp,
      userId: uid,
      verified: false,
      expiresAt: new Date(Date.now() + 86400000),
    });
  }
}

export const otpService = new OtpService();
export default otpService;
