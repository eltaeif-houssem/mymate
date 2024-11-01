import multer, { StorageEngine } from "multer";
import path from "path";

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set folder based on the field name
    if (file.fieldname === "avatar") {
      cb(null, path.join(__dirname, `../uploads/avatars`));
    } else if (file.fieldname === "cover") {
      cb(null, path.join(__dirname, `../uploads/covers`));
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    // Set the file name with current timestamp to avoid overwriting
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define file filter to accept only image files
const fileFilter = (
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
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // Limit file size to 2MB
  },
});

// Set up routes to handle avatar and cover uploads
export const uploadAvatar = upload.single("avatar");
export const uploadCover = upload.single("cover");
