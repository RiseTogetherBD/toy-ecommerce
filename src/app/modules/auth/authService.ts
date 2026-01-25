
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../../lib/prisma";
import { sendEmail } from "../../../utils/mailer";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { Prisma, Role } from "@prisma/client";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

//  Registration (email verification only, no JWT yet)
const registerUser = async (payload: RegisterPayload) => {
  const { name, email, password, role  } = payload;
  const userRole = role ?? Role.USER;

  if (!email || !password) throw new Error("Email and password required");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role:userRole , },
    select: { id: true, name: true, email: true, role: true },
  });

  // Create email verification token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24hr expiry

  await prisma.emailVerification.create({
    data: { token, userId: user.id, expiresAt },
  });

  // Send verification email
  const url = `http://localhost:3000/api/v1/auth/verify-email?token=${token}`;
  const html = `<h1>Verify Your Email</h1><p>Click link to verify:</p><a href="${url}">${url}</a>`;
  await sendEmail({ to: email, subject: "Email Verification", html });

  return user;
};

//  Login
const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  if (!user.isVerified) throw new Error("Please verify your email first");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id },
  });

  return { user, accessToken, refreshToken };
};

//  Verify Email
const verifyEmail = async (token: string) => {
  const record = await prisma.emailVerification.findUnique({ where: { token } });
  
console.log("Token in DB:", record?.token);
  if (!record || record.expiresAt < new Date()) throw new Error("Invalid or expired token");

  await prisma.user.update({ where: { id: record.userId }, data: { isVerified: true } });
  await prisma.emailVerification.delete({ where: { id: record.id } });

  return true;
};

//  Refresh Token
const refreshToken = async (token: string) => {
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored) throw new Error("Invalid refresh token");

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user) throw new Error("User not found");

  await prisma.refreshToken.delete({ where: { token } });
  const newRefreshToken = generateRefreshToken(user.id);
  await prisma.refreshToken.create({ data: { token: newRefreshToken, userId: user.id } });

  const accessToken = generateAccessToken(user);

  return { user, accessToken, refreshToken: newRefreshToken };
};

//  Logout
const logout = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
  return true;
};

// Forget Password
const requestPasswordReset = async(email:string)=>{
  const user = await prisma.user.findUnique({where: {email}})
  if(!user)throw new Error("User not found")
    const token = crypto.randomBytes(32).toString("hex")
  const expiresAt  = new Date()
  expiresAt.setHours(expiresAt.getHours()+1)
  await prisma.passwordReset.create({
    data:{token, userId:user.id,expiresAt}
  })
  const url =`http://localhost:5000/api/v1/auth/reset-password?token=${token}`;
  const html = `<h1>Reset Your Password</h1><p>Click link to reset</p><a href="${url}">${url}</a>`
  await sendEmail({to: email, subject:"Reset Password", html})
  return{message: "Password reset email sent"}

}
// Reset Password
const resetPassword = async (token: string, newPassword: string) => {
  const record = await prisma.passwordReset.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordReset.delete({ where: { id: record.id } });

  return { message: "Password reset successfully" };
};

export const authServices = { 
  registerUser, 
  login, verifyEmail, 
  refreshToken, 
  logout,
  requestPasswordReset,
  resetPassword

 };
