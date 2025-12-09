import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ideaRouter from "./routes/ideaRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ideas", ideaRouter);

app.use((req, res, next) => {
  const errors = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(errors);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
