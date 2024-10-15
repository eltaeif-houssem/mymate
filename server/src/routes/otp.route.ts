import { Router } from "express";
import * as controller from "@controllers/otp.controller";

export const router = Router();

router.post("/reset-password", controller.resetPassword);

export default router;
