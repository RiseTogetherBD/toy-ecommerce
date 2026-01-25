import { Router } from "express";
import { authController } from "./authController";






const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/logout",  authController.logout);
router.post("/refresh-token",authController.refresh);
router.get("/verify-email", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


export const authRoute = router;
