import multer from "multer";
import path from "path";
import fs from "fs";

// Create storage configuration factory
const createStorage = (folderPath: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, `../uploads/${folderPath}`);
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
};

// File filters
const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// Create multer instances for different upload types
export const avatarUpload = multer({
  storage: createStorage("avatars"),
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB limit for avatars
  },
});

export const coverUpload = multer({
  storage: createStorage("covers"),
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit for covers
  },
});
