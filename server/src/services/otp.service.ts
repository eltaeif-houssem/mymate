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

    if (otp.verified) {
      throw new CustomError("this otp code already used");
    }

    await Otp.findOneAndUpdate(payload, { verified: true });
  }

  async checkOtp(payload: any) {
    const otp = await Otp.findOne(payload);
    const today = new Date();

    if (!otp) {
      throw new CustomError("there's no otp");
    }

    if (today > otp.expiresAt) {
      throw new CustomError("otp code is expired");
    }

    return otp;
  }
}

export const otpService = new OtpService();
export default otpService;
