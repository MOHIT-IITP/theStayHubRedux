import express from "express";
import { deletePlaces, getAllPlace, getPlace, handleAddPlace, showPlaces, updatePlace } from "../controller/place.controller.js";
import { protectRoute } from "../lib/protectRoute.js";
const router = express.Router();

router.post("/addplace",protectRoute, handleAddPlace);
router.get("/showplaces",protectRoute, showPlaces);
router.post('/deleteplace/:id',  deletePlaces);
router.put('/editplace/:id', updatePlace);
router.get('/places/:id', getPlace);
router.get('/place', getAllPlace);

export default router;

