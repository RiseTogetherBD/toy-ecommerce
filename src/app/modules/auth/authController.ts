import { Request, Response } from "express";
import { authServices } from "./authService";
import { cookieOptions } from "../../../utils/cookieOptions";

const signup = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } =
      await authServices.registerUser(req.body);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } =
      await authServices.login(req.body.email, req.body.password);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token provided");

    const { accessToken, refreshToken: newToken, user } =
      await authServices.refreshToken(token);

    // FIXED
    res.cookie("refreshToken", newToken, cookieOptions);

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error: any) {
    res.status(403).json({ success: false, message: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token");

    await authServices.logout(token);

    // SAME options as set
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const authController = {
  signup,
  signin,
  refreshToken,
  logout,
};
