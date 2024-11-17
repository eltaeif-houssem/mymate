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
    } else if (file.fieldname === "post-image") {
      cb(null, path.join(__dirname, `../uploads/post-images`));
    } else if (file.fieldname === "post-video") {
      cb(null, path.join(__dirname, `../uploads/post-videos`));
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

const videoFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = /mp4|mov|avi|mkv|flv|wmv/;
  const isValid = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video files are allowed."));
  }
};

// Configure multer with storage, file filter, and size limit
const imageUpload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // Limit file size to 3MB
  },
});

const videoUpload = multer({
  storage: storage,
  fileFilter: videoFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
  },
});

// Set up routes to handle avatar and cover uploads
export const uploadAvatar = imageUpload.single("avatar");
export const uploadCover = imageUpload.single("cover");
export const uploadPostImage = imageUpload.single("post-image");
export const uploadPostVideo = videoUpload.single("post-video");
