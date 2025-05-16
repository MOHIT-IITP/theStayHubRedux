import express from "express";
import { deletePlaces, handleAddPlace, showPlaces, updatePlace } from "../controller/place.controller.js";
import { protectRoute } from "../lib/protectRoute.js";
const router = express.Router();

router.post("/addplace",protectRoute, handleAddPlace);
router.get("/showplaces",protectRoute, showPlaces);
router.post('/deleteplace/:id',  deletePlaces);
router.put('/updateplace/:id', updatePlace);

export default router;

