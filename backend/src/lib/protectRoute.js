import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// checking if the user is present or not
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!jwtSecret){
            return res.status(400).json({message: "Error in Jwt secret"});
        }

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized User , Invalid Token" });
        }

        const decoded = jwt.verify(token, jwtSecret );

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
