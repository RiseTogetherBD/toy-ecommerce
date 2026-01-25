import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routers";
import { notFound } from "./app/middlewares/notFound";
import errorHandler from "./app/middlewares/globalErrorHandler";
import passport from "passport";
import "./app/Config/passport"

const app: Application = express();

// CORS with credentials
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

//  cookie parser MUST
app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());

// MAIN ROUTE
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.use(notFound);
app.use(errorHandler);

export default app;
