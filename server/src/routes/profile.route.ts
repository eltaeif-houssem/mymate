import { Router } from "express";
import * as controller from "@controllers/profile.controller";
import { uploadAvatar, uploadCover } from "@configs/multer.config";
import { verifyUser } from "@middlewares/auth.middleware";

export const router = Router();

router.put("/:id", verifyUser, controller.updateProfile);
router.get("/:id", verifyUser, controller.getProfile);
router.get("/avatar/:id", controller.getAvatar);
router.get("/cover/:id", controller.getCover);
router.put("/avatar", verifyUser, uploadAvatar, controller.updateAvatar);
router.put("/cover", verifyUser, uploadCover, controller.updateCover);

export default router;
