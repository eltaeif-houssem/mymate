import { NextFunction, Request, Response } from "express";
import userService from "@services/user.service";
import * as jwtUtil from "@utils/jwt.util";
import * as bcryptUtil from "@utils/bcrypt.util";
import { CustomError } from "@utils/errors.util";
import { IUserReq } from "@interfaces/request.interface";

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

    response.status(201).send({ data, access_token, refresh_token });
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
  } catch (error) {
    next(error);
  }
};