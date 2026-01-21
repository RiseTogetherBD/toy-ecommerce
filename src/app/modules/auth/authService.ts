import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import config from "../../Config";



const registerUser = async (payload: any) => {
  const { name, email, password, role } = payload;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  // check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

   const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);

  //  save refresh token in DB
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};



const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id );

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return {user, accessToken, refreshToken };
};


const refreshToken = async (token: string) => {
  if (!token) throw new Error("Refresh token missing");

  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored) throw new Error("Invalid refresh token");

  const payload: any = Jwt.verify(token, config.jwt.refresh_secret);
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) throw new Error("User not found");

  // Rotate token: delete old, create new
  await prisma.refreshToken.delete({ where: { token } });
  const newRefreshToken = generateRefreshToken(user.id);
  await prisma.refreshToken.create({ data: { token: newRefreshToken, userId: user.id } });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id)


  return { accessToken, refreshToken, user };
};
const logout = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // delete token from DB
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  });

  return true;
};

export const authServices = {
registerUser,
 login,
 logout,
 refreshToken
};
