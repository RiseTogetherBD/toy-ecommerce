import { Request, Response } from "express";
import { authServices } from "./authService";
import { cookieOptions } from "../../../utils/cookieOptions";

// Signup
const signup = async (req: Request, res: Response) => {
  try {
    const user = await authServices.registerUser(req.body);
    res.status(201).json({ success: true, user, message: "Check email to verify account" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Verify Email
const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error("Token missing");
    await authServices.verifyEmail(token as string);
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Signin
const signin = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authServices.login(req.body.email, req.body.password);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.json({ success: true, user, accessToken });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

// Refresh token
const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token");
    const data = await authServices.refreshToken(token);
    res.cookie("refreshToken", data.refreshToken, cookieOptions);
    res.json({ success: true, user: data.user, accessToken: data.accessToken });
  } catch (error: any) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Logout
const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token");
    await authServices.logout(token);
    res.clearCookie("refreshToken", cookieOptions);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Forget password
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authServices.requestPasswordReset(email);
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reset password
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authServices.resetPassword(token, newPassword);
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const authController = { signup, 
      verifyEmail, 
      signin, 
      refresh, 
      logout ,
      forgotPassword,
      resetPassword,
};
