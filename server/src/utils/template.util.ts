import fs from "fs";
import path from "path";

export const readTemplate = (template: string) => {
  const templatePath = path.join(__dirname, `../templates/${template}`);
  const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
  return htmlTemplate;
};
