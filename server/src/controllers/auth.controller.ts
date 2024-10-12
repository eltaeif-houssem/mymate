import { NextFunction, Request, Response } from "express";
import userService from "@services/user.service";
import * as jwtUtil from "@utils/jwt.util";
import * as bcryptUtil from "@utils/bcrypt.util";
import { CustomError } from "@utils/errors.util";

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

    return response.status(201).send({ data, access_token, refresh_token });
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
      user.password,
      body.password
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

    return response.status(201).send({ data, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};
