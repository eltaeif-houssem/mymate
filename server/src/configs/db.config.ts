import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// define vars
const DB_URL = process.env.DB_URL;

// define database connection function
export const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URL}`);
    console.log("Database connected");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
