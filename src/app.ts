import express, { Application } from "express";
import cors from "cors";
import router from "./app/routers";
import { notFound } from "./app/middlewares/notFound";
import errorHandler from "./app/middlewares/globalErrorHandler";

import passport from "./app/Config/passport"



const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


// MAIN ROUTE
app.use("/api/v1", router);


app.get("/", (req, res) => {
  res.send("Server running successfully");
});
app.use(notFound);



app.use(errorHandler)
export default app;
