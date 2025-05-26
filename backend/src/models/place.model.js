import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    perks: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        default: []
    },
    extraInfo: {
        type: String,
        required: true
    },
    checkIn: {
        type: Number,
        required: true
    },
    checkOut: {
        type: Number,
        required: true
    },
    maxGuests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const PlaceModel = mongoose.model('PlaceModel', placeSchema);

export default PlaceModel;
