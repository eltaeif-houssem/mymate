import { Router } from "express";
import * as controller from "@controllers/auth.controller";

export const router = Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.post("/verify-token", controller.verifyUserToken);

export default router;