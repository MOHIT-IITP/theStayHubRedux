import express from "express";
const app = express();
import multer from "multer";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import fs from "fs";
import AuthRouter from "./routes/auth.route.js";
import PlaceRouter from "./routes/place.route.js";
import BookingRouter from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDatabase } from "./lib/connectdb.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT; 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL, 
        credentials: true,
    }),
);

connectDatabase();

app.use("/auth", AuthRouter);
app.use("/", PlaceRouter);
app.use("/", BookingRouter);

// after you complete backend then delete this get route
app.get("/", (req, res) => {
  res.json("Server is running");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp');  // Use the writable /tmp directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const photosMiddleware = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  if (req.files && req.files.length > 0) {
    console.log("Files received:", req.files); // Debug log
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      try {
        const result = await cloudinary.uploader.upload(path, {
          folder: "uploads",
        });
        uploadedFiles.push(result.secure_url);
        fs.unlinkSync(path); // Remove the local file after upload
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }
    }
    res.json(uploadedFiles);
  } else {
    res.status(400).json({ message: "No files uploaded" });
  }
});


app.listen(PORT, (req, res) => console.log(`Server is running on ${PORT}`));
