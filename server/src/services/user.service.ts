import User from "@models/user.model";
import { CustomError } from "@utils/errors.util";

// create user
export const createUser = async (payload: any) => {
  const userExist = await User.findOne({ email: payload.email });

  if (userExist) throw new CustomError("User already exists", 400);

  const newUser = await User.create(payload);
  const { password, ...data } = newUser.toObject();

  return data;
};
