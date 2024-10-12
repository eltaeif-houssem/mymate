import User from "@models/user.model";
import { CustomError } from "@utils/errors.util";

class UserService {
  // create user
  async createUser(payload: any) {
    const userExist = await User.findOne({ email: payload.email });

    if (userExist) throw new CustomError("User already exists", 400);

    const newUser = await User.create(payload);
    const { password, ...data } = newUser.toObject();

    return data;
  }

  // find user
  async findUser(payload: any) {
    const userExist = await User.findOne({ email: payload.email });

    if (!userExist) throw new CustomError("User does not exist", 404);

    const { password, ...data } = userExist.toObject();

    return data;
  }

  // update user
  async updateUser(id: string, payload: any) {
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updatedUser) throw new CustomError("User was not found", 400);

    const { password, ...data } = updatedUser.toObject();

    return data;
  }

  // delete user
  async deleteUser(id: string) {
    const deletedUser = await User.findByIdAndDelete(id, { new: true });

    if (!deletedUser) throw new CustomError("User was not found", 400);

    const { password, ...data } = deletedUser.toObject();

    return data;
  }
}

export const userService = new UserService();
export default userService;
