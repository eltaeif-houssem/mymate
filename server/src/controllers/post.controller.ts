import { IUserReq } from "@interfaces/request.interface";
import postService from "@services/post.service";
import { CustomError } from "@utils/errors.util";
import { NextFunction, Response } from "express";

export const createPost = async (
  request: IUserReq,
  response: Response,
  next: NextFunction
) => {
  const user = request.user;
  const body = request.body;
  try {
    const newBody: any = { user: user?.id };

    if (body.content) {
      newBody["content"] = body.content;
    }

    if (request.file) {
      newBody["postPicture"] = request.file.filename;
    }

    const newPost = await postService.create(newBody);

    response.status(201).send({
      message: "post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};
