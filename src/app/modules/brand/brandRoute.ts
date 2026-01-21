import { Router } from "express";
import { brandController } from "./brandController";
import { auth, authenticate } from "../../middlewares/auth";
import { Role } from "@prisma/client";


const brandRouter = Router();

brandRouter.post("/", authenticate, auth(Role.ADMIN), brandController.createBrand);
brandRouter.get("/", brandController.getAllBrand);
brandRouter.get("/:id", brandController.getSingleBrandById);
brandRouter.put("/:id", authenticate, auth(Role.ADMIN), brandController.updatedBrand);
brandRouter.delete("/:id", authenticate, auth(Role.ADMIN), brandController.deletedBrand);

export default brandRouter;
