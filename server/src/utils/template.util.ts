import fs from "fs";
import path from "path";

export const readTemplate = async (template: string) => {
  const templatePath = path.join(__dirname, `../templates/${template}`);
  const htmlTemplate = await fs.promises.readFile(templatePath, "utf-8");
  return htmlTemplate;
};
