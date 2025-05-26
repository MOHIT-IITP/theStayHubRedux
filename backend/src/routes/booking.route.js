import express from "express"
import { handleBooking, showbookingPlaces } from "../controller/booking.controller.js";
const router = express.Router();
import { protectRoute } from "../lib/protectRoute.js";

router.post("/booking/:id",protectRoute, handleBooking)
router.get('/bookings',protectRoute, showbookingPlaces);

export default router;
