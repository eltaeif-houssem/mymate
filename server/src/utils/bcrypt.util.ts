import bcrypt from "bcrypt";

// hash password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

// compare password
export const comparePassword = async function (
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
};
