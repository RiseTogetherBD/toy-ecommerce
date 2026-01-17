import express from "express";
import cors from "cors";
import router from "./app/routers";
import { notFound } from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app = express();

app.use(cors());
app.use(express.json());

// MAIN ROUTE
app.use("/api/v1", router);


app.get("/", (req, res) => {
  res.send("Server running successfully");
});
app.use(notFound);

app.use(globalErrorHandler)
export default app;
