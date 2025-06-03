import User from "../models/auth.model.js";
import BookingModel from "../models/booking.model.js";

export const handleBooking = async(req, res) => {
    try {
        const {id: placeid } = req.params;
        const {owner, title, checkIn, checkOut, name, phone, price} = req.body;
        const userid = req.user;
        const newBooking = new BookingModel({
            place: placeid,
            user: userid._id,
            owner,
            title,
            checkIn,
            checkOut,
            name,
            phone,
            price,
            status: "pending"
        });
        await newBooking.save();
        await User.findByIdAndUpdate(
            userid._id,
            {$push: {bookings: newBooking}},
            {new: true}
        );
        res.json(newBooking);

    } catch (error) {
        console.log("Error in handle booking controller");
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const showbookingPlaces = async(req, res) => {
    try {
        const user = req.user._id;
        if (!user) {
            return res.status(400).json({ message: "User is not present. Login first." });
        }
        const userwithBooking = await User.findById(user).populate("bookings");
        if (!userwithBooking) {
            return res.status(400).json({ message: "Booking not found" });
        }
        res.json({ bookings: userwithBooking.bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteBooking = async(req, res) => {
    try {
        const {id: bookingid} = req.params;
        const user = req.user._id;
        if (!user) {
            return res.status(400).json({ message: "User is not present. Login first." });
        }
        const deletedBooking = await BookingModel.findByIdAndDelete(bookingid);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        await User.findByIdAndUpdate(
            user,
            { $pull: { bookings: bookingid } },
            { new: true }
        );
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const handleShowBooking = async (req, res) => {
    try {
        const userid = req.user._id;
        if (!userid) {
            return res.status(400).json({ message: "User is not present. Login first." });
        }
        const bookings = await BookingModel.find({ owner: userid, status: "pending" });
        res.json({ bookings });
    } catch (error) {
        console.log("Error in handle show booking controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const handleAcceptBooking = async (req, res) => {
    try {
        const { id: bookingid } = req.params;
        const booking = await BookingModel.findById(bookingid);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = "accepted";
        await booking.save();
        res.json({ message: "Booking accepted successfully", booking });
    } catch (error) {
        console.log("Error in handle accept booking controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const handleRejectBooking = async (req, res) => {
    try {
        const { id: bookingid } = req.params;
        const { reason } = req.body;
        // First, check if booking exists
        const booking = await BookingModel.findById(bookingid);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = "rejected";
        booking.reasonCancel = reason; // Make sure your schema supports this field
        await booking.save();
        res.json({ message: "Booking rejected successfully", booking });
    } catch (error) {
        console.log("Error in handle reject booking controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



export const getBookingInfo = async(req, res) => {
    try {
        const {id: bookingid} = req.params;

        const booking = await BookingModel.findById(bookingid);
        if(!booking) {
            return res.status(404).json({message:"Booking not found"});
        }

        return res.json(booking);

    } catch (error) {
        console.log("Error in getting booking controller");
        return res.status(500).json({error: "Internal Server Error"});
    }
}
