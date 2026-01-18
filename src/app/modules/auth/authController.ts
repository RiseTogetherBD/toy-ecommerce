import { Request, Response } from "express";
import { authServices } from "./authService";


const signup = async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authServices.loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const authController = {
  signup,
  signin,
};
