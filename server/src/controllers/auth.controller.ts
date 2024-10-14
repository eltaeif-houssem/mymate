import { NextFunction, Request, Response } from "express";
import userService from "@services/user.service";
import * as jwtUtil from "@utils/jwt.util";
import * as bcryptUtil from "@utils/bcrypt.util";
import { CustomError } from "@utils/errors.util";
import { IUserReq } from "@interfaces/request.interface";
import { readTemplate } from "@utils/template.util";
import { generateOTP } from "@utils/email.util";
import emailService from "@services/email.service";
import Otp from "@models/otp.model";

// signup user
export const signup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  try {
    const user = await userService.createUser(body);

    const access_token = jwtUtil.generateToken({
      id: `${user._id}`,
      email: user.email,
      role: user.role,
    });

    const refresh_token = jwtUtil.generateRefreshToken({
      id: `${user._id}`,
      email: user.email,
      role: user.role,
    });

    const { role, password, ...data } = user;

    response.status(201).send({ data, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};

// signin user
export const signin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  try {
    const user = await userService.findUser(body);

    const isMatch = await bcryptUtil.comparePassword(
      body.password,
      user.password
    );

    if (!isMatch) throw new CustomError("Email or password are incorrect", 404);

    const access_token = jwtUtil.generateToken({
      id: `${user._id}`,
      email: user.email,
      role: user.role,
    });

    const refresh_token = jwtUtil.generateRefreshToken({
      id: `${user._id}`,
      email: user.email,
      role: user.role,
    });

    const { role, password, ...data } = user;

    response.status(200).send({ data, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};

// verify user token
export const verifyUserToken = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const access_token = request.headers.authorization?.split(" ")[1];
  const refresh_token = request.body.refresh_token;
  let user;

  try {
    if (access_token) {
      user = jwtUtil.verifyToken(access_token);
      if (user) {
        const { password, role, ...data } = await userService.findUser(user);
        response.status(200).send({ data });
        return;
      }
    }

    if (refresh_token) {
      user = jwtUtil.verifyRefreshToken(refresh_token);
      if (user) {
        const new_access_token = jwtUtil.generateToken(user);
        const new_refresh_token = jwtUtil.refreshAccessToken(refresh_token);
        const { password, role, ...data } = await userService.findUser(user);

        response.status(201).send({
          access_token: new_access_token,
          refresh_token: new_refresh_token,
          data,
        });
        return;
      }
    }

    response.status(401).send({ message: "Invalid tokens" });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  try {
    if (!body.email) throw new CustomError("Email is required", 400);

    const user = await userService.findUser(body);
    if (!user) throw new CustomError("User does not exist", 404);

    const otp = generateOTP();
    await Otp.create({
      otp,
      userId: user._id,
      verified: false,
      expiresAt: new Date(Date.now() + 86400000),
    });

    const htmlTemplate = readTemplate("otp.template.html");
    htmlTemplate.replace("{{OTP_CODE}}", otp);
    htmlTemplate.replace(
      "{{RESET_LINK}}",
      "http://localhost:3000/auth/reset-password"
    );
    htmlTemplate.replace(
      "{{CURRENT_YEAR}}",
      new Date().getFullYear().toString()
    );

    await emailService.send(
      `${body.email}`,
      "password reset",
      "",
      htmlTemplate
    );

    response
      .status(201)
      .send({ message: "an reset password code was submitted to your email" });
  } catch (error) {
    next(error);
  }
};
