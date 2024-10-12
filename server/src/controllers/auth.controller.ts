import { NextFunction, Request, Response } from "express";
import userService from "@services/user.service";
import * as jwtUtil from "@utils/jwt.util";

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

    const { role, ...data } = user;

    return response.status(201).send({ data, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};
