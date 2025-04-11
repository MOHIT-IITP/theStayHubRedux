import User from "../models/auth.model.js";
import { jwtSecret } from "./jwtVerify.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized User , Invalid Token" });
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized User  " });
    }
    const user = await User.findById(decoded.UserId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route");
    res.status(500).json("Internal Server Error");
  }
};
