import { Router } from "express";
import * as controller from "@controllers/otp.controller";

export const router = Router();

router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);

export default router;
