import { Router } from "express";
import { productsController } from "./productsController";
import { auth, authenticate } from "../../middlewares/auth";
import { Role } from "@prisma/client";


const productRouter = Router();

productRouter.post("/", authenticate, auth(Role.ADMIN), productsController.createProduct);     
productRouter.get("/", productsController.getAllProducts);     
productRouter.get("/:id", productsController.getProductById);  
productRouter.put("/:id", authenticate, auth(Role.ADMIN), productsController.updateProduct);   
productRouter.delete("/:id", authenticate, auth(Role.ADMIN), productsController.deleteProduct); 
export default productRouter;
