import emailService from "@services/email.service";
import otpService from "@services/otp.service";
import userService from "@services/user.service";
import { CustomError } from "@utils/errors.util";
import { readTemplate } from "@utils/template.util";
import { NextFunction, Request, Response } from "express";

// send reset code password
export const resetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  try {
    if (!body.email) throw new CustomError("Email is required", 400);

    const user = await userService.findUser(body);
    if (!user) throw new CustomError("User does not exist", 404);

    const otp = await otpService.createOtp(`${user._id}`);

    let htmlTemplate = await readTemplate("otp.template.html");
    htmlTemplate = htmlTemplate.replace("{{OTP_CODE}}", otp);
    htmlTemplate = htmlTemplate.replace(
      "{{CURRENT_YEAR}}",
      new Date().getFullYear().toString()
    );

    await emailService.send(
      `${body.email}`,
      "password reset code",
      "",
      htmlTemplate
    );

    response
      .status(201)
      .send({ message: "reset password code was submitted to your email" });
  } catch (error) {
    next(error);
  }
};

// verify otp code
export const verifyResetPasswordOtp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  try {
    if (!body.email) throw new CustomError("Email is required", 400);

    const user = await userService.findUser(body);
    if (!user) throw new CustomError("User does not exist", 404);
  } catch (error) {
    next(error);
  }
};
