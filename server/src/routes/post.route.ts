import { Router } from "express";
import * as controller from "@controllers/post.controller";
import { uploadPostImage, uploadPostVideo } from "@configs/multer.config";
import { verifyUser } from "@middlewares/auth.middleware";

export const router = Router();

router.post(
  "/",
  verifyUser,
  uploadPostImage,
  uploadPostVideo,
  controller.createPost
);

export default router;
