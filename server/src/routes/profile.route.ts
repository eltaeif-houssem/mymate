import { Router } from "express";
import * as controller from "@controllers/profile.controller";
import { avatarUpload, coverUpload } from "@configs/multer.config";
import { verifyUser } from "@middlewares/auth.middleware";

export const router = Router();

router.get("/avatar/:id", verifyUser, controller.fetchAvatar);
router.get("/cover/:id", verifyUser, controller.fetchCover);
router.put(
  "/avatar",
  verifyUser,
  avatarUpload.single("avatar"),
  controller.updateAvatar
);
router.put(
  "/cover",
  verifyUser,
  coverUpload.single("cover"),
  controller.updateCover
);

export default router;
