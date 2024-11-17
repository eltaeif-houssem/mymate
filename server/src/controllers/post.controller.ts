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
