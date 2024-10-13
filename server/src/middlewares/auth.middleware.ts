import { verifyToken } from "@utils/jwt.util";
import { NextFunction, Response } from "express";
import { IUserReq } from "@interfaces/request.interface";
import { CustomError } from "@utils/errors.util";
import { Role } from "@interfaces/user.interface";

// verify user authentication
export const verifyUser = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];
  try {
    if (!token) throw new CustomError("you are not authenticated", 401);

    const user = verifyToken(token);
    if (!user) throw new CustomError("bearer token is not valid", 401);

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// verify admin
export const verifyAdmin = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];
  try {
    if (!token) throw new CustomError("you are not authenticated", 401);

    const user = verifyToken(token);
    if (!user) throw new CustomError("bearer token is not valid", 401);

    if (user.role !== Role.ROLE_ADMIN)
      throw new CustomError("you are not authorized", 403);

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
