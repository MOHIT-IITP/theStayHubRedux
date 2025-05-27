import express from "express"
import { deleteBooking, handleAcceptBooking, handleBooking, handleRejectBooking, handleShowBooking, showbookingPlaces } from "../controller/booking.controller.js";
const router = express.Router();
import { protectRoute } from "../lib/protectRoute.js";

router.post("/booking/:id",protectRoute, handleBooking)
router.get('/bookings',protectRoute, showbookingPlaces);
router.post('/deletebooking/:id',protectRoute, deleteBooking);
router.get('/showbooking', protectRoute, handleShowBooking);
router.post('/booking/:id/accept', protectRoute, handleAcceptBooking);
router.post('/booking/:id/reject', protectRoute, handleRejectBooking);

export default router;
