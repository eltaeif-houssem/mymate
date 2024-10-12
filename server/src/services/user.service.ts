import User from "@models/user.model";
import { CustomError } from "@utils/errors.util";

class UserService {
  // create user
  async createUser(payload: any) {
    const userExist = await User.findOne({ email: payload.email });

    if (userExist) throw new CustomError("User already exists", 400);

    const newUser = await User.create(payload);

    return newUser.toObject();
  }

  // find user
  async findUser(payload: any) {
    const userExist = await User.findOne({ email: payload.email });

    if (!userExist) throw new CustomError("User does not exist", 404);

    return userExist.toObject();
  }

  // update user
  async updateUser(id: string, payload: any) {
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updatedUser) throw new CustomError("User was not found", 400);

    return updatedUser.toObject();
  }

  // delete user
  async deleteUser(id: string) {
    const deletedUser = await User.findByIdAndDelete(id, { new: true });

    if (!deletedUser) throw new CustomError("User was not found", 400);

    return deletedUser.toObject();
  }
}

export const userService = new UserService();
export default userService;
