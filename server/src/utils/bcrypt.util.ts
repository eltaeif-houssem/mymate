import bcrypt from "bcrypt";

// compare password
export const comparePassword = async function (
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
};
