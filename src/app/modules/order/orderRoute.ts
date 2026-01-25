import { Router } from "express";
import { orderController } from "./orderController";
import { auth, authenticate } from "../../middlewares/auth";
import { Role } from "@prisma/client";



const router = Router();

router.post("/",  authenticate, auth(Role.ADMIN), orderController.create);
router.get("/", authenticate, auth(Role.ADMIN), orderController.getAll);
router.patch("/:id/status", authenticate, auth(Role.ADMIN), orderController.updateStatus);

export default router;
