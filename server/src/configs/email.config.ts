import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// define vars
const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${EMAIL_USER}`,
    pass: `${EMAIL_PASSWORD}`,
  },
});

export default transporter;
