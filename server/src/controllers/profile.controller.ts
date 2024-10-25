import { NextFunction, Response } from "express";
import { CustomError } from "@utils/errors.util";
import { IUserReq } from "@interfaces/request.interface";
import profileService from "@services/profile.service";

export const updateAvatar = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  try {
    if (!request.file) throw new CustomError("No file was found", 400);

    await profileService.updateUserAvatar(
      {
        user: user?.id,
      },
      request.file.filename
    );

    response.status(201).send({ message: "avatar picture was updated" });
  } catch (error) {
    next(error);
  }
};

export const updateCover = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  try {
    if (!request.file) throw new CustomError("No file was found", 400);

    await profileService.updateUserCover(
      {
        user: user?.id,
      },
      request.file.filename
    );

    response.status(201).send({ message: "cover picture was updated" });
  } catch (error) {
    next(error);
  }
};
