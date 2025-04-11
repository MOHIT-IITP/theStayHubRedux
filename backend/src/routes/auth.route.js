import express from "express";
import {
  checkAuth,
  handleLogin,
  handleLogout,
  handleSignUp,
} from "../controller/auth.controller.js";
import { protectRoute } from "../lib/protectRoute.js";
const router = express.Router();

router.post("/signup",   handleSignUp);
router.post("/login",  handleLogin);
router.post("/logout", handleLogout);
router.get('/check', protectRoute, checkAuth)

export default router;
