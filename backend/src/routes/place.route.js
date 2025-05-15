import express from "express";
import { handleAddPlace, showPlaces } from "../controller/place.controller.js";
import { protectRoute } from "../lib/protectRoute.js";
const router = express.Router();

router.post("/addplace",protectRoute, handleAddPlace);
router.get("/showplaces", showPlaces);

export default router;

