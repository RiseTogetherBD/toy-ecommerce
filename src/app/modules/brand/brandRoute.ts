import { Router } from "express";
import { brandController } from "./brandController";


const brandRouter = Router();

brandRouter.post("/", brandController.createBrand);
brandRouter.get("/", brandController.getAllBrand);
brandRouter.get("/:id", brandController.getSingleBrandById);
brandRouter.put("/:id", brandController.updatedBrand);
brandRouter.delete("/:id", brandController.deletedBrand);

export default brandRouter;
