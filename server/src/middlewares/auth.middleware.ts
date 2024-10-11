import { verifyToken } from "@utils/jwt.util";
import { NextFunction, Response } from "express";
import { IUserReq } from "@interfaces/request.interface";
import { CustomError } from "@utils/errors.util";

// verify user authentication
export const verifyUser = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[0];
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
