import { Router } from "express";
import userRouter from "../modules/users/usersRoute";
import productRouter from "../modules/products/productsRoute";
import categoryRouter from "../modules/category/categoryRoute";
import brandRouter from "../modules/brand/brandRoute";
import orderRoute from "../modules/order/orderRoute";
import { authRoute } from "../modules/auth/authRoute";


const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter)
router.use("/categories", categoryRouter)
router.use("/brands", brandRouter)
router.use("/auth", authRoute)
router.use("/orders", orderRoute)

export default router;
