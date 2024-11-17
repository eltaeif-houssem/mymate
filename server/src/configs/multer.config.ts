import multer, { StorageEngine } from "multer";
import path from "path";

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, path.join(__dirname, `../uploads/profile`));
    } else if (file.fieldname === "cover") {
      cb(null, path.join(__dirname, `../uploads/covers`));
    } else if (file.fieldname === "postimage") {
      cb(null, path.join(__dirname, `../uploads/post`));
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define file filter to accept only image files
const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed!"));
  }
};

// Configure multer with storage, file filter, and size limit
const imageUpload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

// Set up routes to handle avatar and cover uploads
export const uploadAvatar = imageUpload.single("avatar");
export const uploadCover = imageUpload.single("cover");
export const uploadPostImage = imageUpload.single("postimage");
