import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "@interfaces/request.interface";

dotenv.config();
// Read environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d"; // Default to 1 day if not provided
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d"; // Default to 7 days if not provided

// Function to generate a JWT (Access Token)
export const generateToken = (payload: IUser): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Function to generate a Refresh Token
export const generateRefreshToken = (payload: IUser): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
};

// Function to verify JWT (Access Token)
export const verifyToken = (token: string): IUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IUser;
    return decoded;
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};

// Function to verify Refresh Token
export const verifyRefreshToken = (refreshToken: string): IUser | null => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as IUser;
    return decoded;
  } catch (error) {
    console.error("Invalid Refresh Token", error);
    return null;
  }
};

// Function to refresh the access token using a refresh token
export const refreshAccessToken = (refreshToken: string): string | null => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return null;
  }

  // Generate a new access token
  const newAccessToken = generateToken({
    id: decoded.id,
    email: decoded.email,
  });

  return newAccessToken;
};
