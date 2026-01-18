import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticate = passport.authenticate("jwt", {
  session: false,
});


export const auth =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: You don't have access",
      });
    }

    next();
  };
