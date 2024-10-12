import bcrypt from "bcrypt";

// compare password
export const comparePassword = async function (
  encryptedPassword: string,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(encryptedPassword, password);
};
