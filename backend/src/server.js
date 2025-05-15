import express from "express";
const app = express();
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.route.js";
import PlaceRouter from "./routes/place.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./lib/connectdb.js";
dotenv.config();

const PORT = process.env.PORT; 
// keep all the use thing here
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

connectDatabase();

app.use("/auth", AuthRouter);
app.use("/", PlaceRouter);

// after you complete backend then delete this get route
app.get("/", (req, res) => {
  res.json("Server is running");
});

app.listen(PORT, (req, res) => console.log(`Server is running on ${PORT}`));
