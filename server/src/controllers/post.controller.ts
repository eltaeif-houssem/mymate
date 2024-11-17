import { IUserReq } from "@interfaces/request.interface";
import { CustomError } from "@utils/errors.util";
import { NextFunction, Response } from "express";

export const createPost = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  const body = request.body;
  console.log("hello");
  //   console.log(request.files);
  try {
    response.status(201).send({
      message: "cover picture was updated",
      data: "post created",
    });
  } catch (error) {
    next(error);
  }
};
