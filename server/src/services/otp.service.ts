import Otp from "@models/otp.model";
import { generateOTP } from "@utils/email.util";
import { CustomError } from "@utils/errors.util";

class OtpService {
  async createOtp(uid: string) {
    const otp = generateOTP();
    await Otp.create({
      otp,
      userId: uid,
      verified: false,
      expiresAt: new Date(Date.now() + 86400000),
    });
    return otp;
  }

  async verifyOtp(payload: any) {
    const otp = await Otp.findOne(payload);
    const today = new Date();

    if (!otp) {
      throw new CustomError("there's no otp");
    }

    if (today > otp.expiresAt) {
      throw new CustomError("otp code is expired");
    }

    await Otp.findOneAndUpdate(payload, { verified: true });
  }
}

export const otpService = new OtpService();
export default otpService;
