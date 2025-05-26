import User from "../models/auth.model.js";
import PlaceModel from "../models/place.model.js";


export const handleAddPlace = async (req, res) => {
    try {
        const {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        } = req.body;

        const userOwner = req.user;

        if (!userOwner) {
            return res.status(400).json({ message: "User is not present. Login first." });
        }

        const newPlace = new PlaceModel({
            owner: userOwner._id,
            title,
            address,
            photos: addedPhotos, 
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });

        await newPlace.save();

        // Add the place ID to the user's document
        await User.findByIdAndUpdate(
            userOwner._id,
            { $push: { places: newPlace._id } },
            { new: true } // optional: return the updated user if needed
        );

        // Send back the newly created place
        res.json(newPlace);

    } catch (error) {
        console.error("Error in handleAddPlace controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const showPlaces = async(req, res) => {
    try {
        const userid = req.user._id;
        const userWithPlaces = await User.findById(userid).populate("places");
        if (!userWithPlaces) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({places: userWithPlaces.places});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletePlaces = async(req, res) => {
    try {
        const {id: placeid} = req.params;
        const deletePlace = await PlaceModel.findByIdAndDelete(placeid);
        if(!deletePlace){
            return res.status(400).json({error: "Delete place is Failed"});
        }
        await User.updateOne(
            {_id: deletePlace.owner},
            {$pull: {places: placeid}}
        );
        return res.status(200).json({message: "Place deleted successfully"});
    } catch (error) {
        console.log("Error in delete place controller");
        res.status(500).json({message: "Internal Server Error"});
    }
}


// Update Place Controller
export const updatePlace = async (req, res) => {
    try {
        const { id: placeId } = req.params; 
        const {
            title,
            address,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
            addedPhotos // <-- get addedPhotos from req.body
        } = req.body;

        // Validation: Check required fields
        if (!title || !address || !description || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update and validate in single query
        const updatedPlace = await PlaceModel.findOneAndUpdate(
            { _id: placeId },
            {
                $set: {
                    title,
                    address,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                    photos: addedPhotos // <-- update photos field
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedPlace) {
            return res.status(404).json({ message: "Place not found or unauthorized" }); // Proper 404
        }

        res.json({ message: "Place updated successfully", place: updatedPlace });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internal server error" }); // Generic message for production
    }
};

// Get Single Place Controller
export const getPlace = async (req, res) => {
    try {
        const { id: placeId } = req.params; // Consistent naming
        const place = await PlaceModel.findById(placeId).select('-__v -createdAt -updatedAt'); // Exclude unnecessary fields

        if (!place) {
            return res.status(404).json({ message: "Place not found" }); // Correct 404 status
        }

        res.json(place);

    } catch (error) {
        console.error("Get place error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllPlace = async(req, res) => {
    try {
        const placeData = await PlaceModel.find();
        res.json(placeData);
    } catch (error) {
        console.log("Error in get all place controller");
        return res.status(500).json({message: "Internal Server Error"});
    }
}


