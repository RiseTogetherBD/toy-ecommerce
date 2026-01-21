import config from "../app/Config";


export const cookieOptions = {
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: (config.node_env === "production" ? "none" : "lax") as
    | "lax"
    | "strict"
    | "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};
