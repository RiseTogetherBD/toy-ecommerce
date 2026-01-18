import { Router } from "express";
import { authController } from "./authController";



const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export const authRoute = router;
