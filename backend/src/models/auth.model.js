import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceModel",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingModel",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
