import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  database_url: process.env.DATABASE_URL || "",
  frontend_url: process.env.FRONTEND_URL || "",

  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET as string,
  },
};

if (!config.jwt.access_secret || !config.jwt.refresh_secret) {
  throw new Error("JWT secrets are missing in .env");
}

export default config;
