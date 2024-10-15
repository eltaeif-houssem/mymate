import mongoose from "mongoose";
import { Role } from "@interfaces/user.interface";
import * as bcryptUtil from "@utils/bcrypt.util";
import { v4 as uuidv4 } from "uuid";

// define user schema
export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
      enum: Object.values(Role),
      default: Role.ROLE_CLIENT,
    },
  },
  { timestamps: true }
);

// hash password before saving the user
userSchema.pre("save", async function (next) {
  this.password = await bcryptUtil.hashPassword(this.password);
  this.username = `@${this.firstname}${this.lastname}${uuidv4().split("-")[0]}`;
  next();
});

// create user model
export const User = mongoose.model("User", userSchema);
export default User;
