import jwt from "jsonwebtoken";
import config from "../app/Config";

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
   config.jwt.access_secret!,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    config.jwt.refresh_secret!,
    { expiresIn: "7d" }
  );
};
