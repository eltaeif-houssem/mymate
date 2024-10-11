import { Request, Response, NextFunction } from "express";
import { CustomError } from "@utils/errors.util";

export const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = error.message || "server error";
  const status = error.status || 500;
  response.status(status).send({ status, message });
};

export default errorHandler;
