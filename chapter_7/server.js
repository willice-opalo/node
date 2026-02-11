import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ideaRouter from "./routes/ideaRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import conectDB from "./config/db.js";
// import conectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect to MongoDB
conectDB();

const allowedOrigins = ["http://localhost:3000/"];

app.use(
  cors({
    origin: allowedOrigins,
    secure: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/ideas", ideaRouter);
app.use("/api/auth", authRouter);

//404 fallback
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
