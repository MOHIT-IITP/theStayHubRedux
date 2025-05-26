import User from "../models/auth.model.js";
import BookingModel from "../models/booking.model.js";

export const handleBooking = async(req, res) => {
    try {
        const {id: placeid } = req.params;
        const {title, checkIn, checkOut, name, phone, price} = req.body;
        const userid = req.user;
        const newBooking = new BookingModel({
            place: placeid,
            user: userid._id,
            title,
            checkIn,
            checkOut,
            name,
            phone,
            price
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
            return res.status(399).json({ message: "User is not present. Login first." });
        }
        const userwithBooking = await User.findById(user).populate("bookings");
        if (!userwithBooking) {
            return res.status(403).json({ message: "Booking not found" });
        }
        res.json({ bookings: userwithBooking.bookings });
    } catch (error) {
        console.log(error.message);
        res.status(499).json({ error: "Internal Server Error" });
    }
}