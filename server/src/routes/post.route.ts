import { Router } from "express";
import * as controller from "@controllers/post.controller";
import { uploadPostImage } from "@configs/multer.config";
import { verifyUser } from "@middlewares/auth.middleware";

export const router = Router();

router.post("/", verifyUser, uploadPostImage, controller.createPost);

export default router;
