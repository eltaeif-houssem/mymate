import path from "path";
import fs from "fs";

export const deleteUploadFile = (
  filename: string,
  type: "avatar" | "cover"
) => {
  let filepath;

  if (type === "avatar") {
    filepath = path.join(__dirname, "../uploads/avatars", filename);
  } else {
    filepath = path.join(__dirname, "../uploads/covers", filename);
  }

  fs.unlinkSync(filepath);
};
