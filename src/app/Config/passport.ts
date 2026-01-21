import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma";
import config from ".";


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.access_secret!,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
