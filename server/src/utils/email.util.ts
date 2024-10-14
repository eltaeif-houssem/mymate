import dotenv from "dotenv";

dotenv.config();
// define vars
const { EMAIL_USER } = process.env;

export const getEmailBody = (
  to: string | string[],
  subject: string,
  text: string = "",
  html: string = ""
) => {
  return {
    from: `${EMAIL_USER}`,
    to: typeof to === "string" ? to : to.join(", "),
    subject,
    text,
    html,
  };
};

export default getEmailBody;
