import mongoose from "mongoose";
import { Role } from "@interfaces/user.interface";
import bcrypt from "bcrypt";

// define user schema
export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: [Role.ROLE_CLIENT, Role.ROLE_ADMIN],
      default: Role.ROLE_CLIENT,
    },
  },
  { timestamps: true }
);

// hash password before saving the user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// create user model
export const User = mongoose.model("User", userSchema);
export default User;
