import { Router } from "express";
import { authController } from "./authController";
import { authenticate } from "../../middlewares/auth";





const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/logout",  authController.logout);
router.post("/refresh-token",authController.refreshToken);


export const authRoute = router;
