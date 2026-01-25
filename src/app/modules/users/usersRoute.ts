import { Router } from "express";
import { usersController } from "./usersController";
import { auth, authenticate } from "../../middlewares/auth";
import { Role } from "@prisma/client";


const userRouter = Router();




userRouter.get("/test", (req, res) => {
  res.send("User route working");
});

// Protected routes
userRouter.post("/", usersController.register);
userRouter.get("/", authenticate, auth(Role.ADMIN), usersController.getAllUsers);
userRouter.get("/:id", authenticate, auth(Role.ADMIN,Role.USER), usersController.getUserById);
userRouter.put("/:id", authenticate, auth(Role.ADMIN,), usersController.updateUser);
userRouter.delete("/:id", authenticate, auth(Role.ADMIN), usersController.deleteUser);


export default userRouter;
