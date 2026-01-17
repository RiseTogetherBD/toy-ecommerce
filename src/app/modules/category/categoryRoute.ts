
import { Router } from "express";
import { categoryController } from "./categoryController";


const categoryRouter = Router();


categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/", categoryController.gelALLCategory);
categoryRouter.get("/:id", categoryController.getSingleCategoryById);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
