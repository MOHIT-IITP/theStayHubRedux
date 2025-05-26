import { genAuthToken } from "../lib/jwtVerify.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const handleLogin = async (req, res) => {
  try {
    const { email, password  } = req.body;

    // checking if user exist or not
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // checking password if email exists
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass)
      return res.status(400).json({ message: "Invalid Credentials" });

    // generating the auth token
    genAuthToken(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in Login controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleSignUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // checking if the user exits in the db or not
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    // generating salt for the password to be hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // creating new user with hashed password
    const newUser = new User({
      fullName,
      email,
      password: hashedPass,
      role: role || "user", 
    });

    await newUser.save();
    genAuthToken(newUser._id, res);

    res.status(201).json({
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log("SignUp controller error ");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check auth controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in LogOut controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
