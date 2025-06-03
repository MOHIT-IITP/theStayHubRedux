import express from "express"
import { deleteBooking, getBookingInfo, handleAcceptBooking, handleBooking, handleRejectBooking, handleShowBooking, showbookingPlaces } from "../controller/booking.controller.js";
const router = express.Router();
import { protectRoute } from "../lib/protectRoute.js";

// post requests 
router.post("/booking/:id",protectRoute, handleBooking)
router.post('/deletebooking/:id',protectRoute, deleteBooking);
router.post('/booking/:id/accept', protectRoute, handleAcceptBooking);
router.put('/booking/:id/reject', protectRoute, handleRejectBooking);

// get requests
router.get('/bookings',protectRoute, showbookingPlaces);
router.get('/showbooking', protectRoute, handleShowBooking);
router.get('/booking/:id', protectRoute, getBookingInfo);

export default router;
