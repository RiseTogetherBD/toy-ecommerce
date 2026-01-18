import jwt from "jsonwebtoken";
import config from "../app/Config";

export const generateToken = (payload: object) => {
  return jwt.sign(payload,config.jwt_secret!, {
    expiresIn: "7d",
  });
};
