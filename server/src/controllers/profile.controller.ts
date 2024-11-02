import { NextFunction, Response } from "express";
import { CustomError } from "@utils/errors.util";
import { IUserReq } from "@interfaces/request.interface";
import profileService from "@services/profile.service";
import path from "path";

export const getProfile = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  const id = request.params.id;

  try {
    if (id !== user?.id)
      throw new CustomError("You try to fetch another person profile", 400);

    const userProfile = await profileService.findProfile({ user: user.id });
    if (!userProfile)
      throw new CustomError("Cannot fetchthe user profile", 400);

    response.status(201).send(userProfile);
  } catch (error) {
    next(error);
  }
};

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

    response.status(201).send({
      message: "avatar picture was updated",
      data: request.file.filename,
    });
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

    response.status(201).send({
      message: "cover picture was updated",
      data: request.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

export const getAvatar = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const imagePath = path.join(__dirname, "../uploads/avatars", `${id}`);
  try {
    response.sendFile(imagePath, (err) => {
      if (err) throw new CustomError("avatar does not exist", 400);
    });
  } catch (error) {
    next(error);
  }
};

export const getCover = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const imagePath = path.join(__dirname, "../uploads/covers", `${id}`);
  try {
    response.sendFile(imagePath, (err) => {
      if (err) throw new CustomError("cover does not exist", 400);
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  const id = request.params.id;
  const body = request.body;

  try {
    if (id !== user?.id)
      throw new CustomError("You try to update another user profile", 400);

    await profileService.updateProfile(
      {
        user: user?.id,
      },
      body
    );

    response.status(201).send({
      message: "profile was updated",
    });
  } catch (error) {
    next(error);
  }
};
