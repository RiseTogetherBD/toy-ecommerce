
import { Router } from "express";
import { categoryController } from "./categoryController";
import { auth, authenticate } from "../../middlewares/auth";
import { Role } from "@prisma/client";


const categoryRouter = Router();


categoryRouter.post("/",  authenticate, auth(Role.ADMIN), categoryController.createCategory);
categoryRouter.get("/", categoryController.gelALLCategory);
categoryRouter.get("/:id", categoryController.getSingleCategoryById);
categoryRouter.put("/:id", authenticate, auth(Role.ADMIN), categoryController.updateCategory);
categoryRouter.delete("/:id", authenticate, auth(Role.ADMIN), categoryController.deleteCategory);

export default categoryRouter;
