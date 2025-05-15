import User from "../models/auth.model.js";
import PlaceModel from "../models/place.model.js";

export const handleAddPlace = async( req,res)=>{
    try {
        const {title, address, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
        const userOwner = req.user;

        // checking if the user is present or not
        console.log(userOwner.fullName);
        if(!userOwner){
            return res.status(400).json({message: "User is not present Login First"});
        }

        const newPlace = new PlaceModel({
            owner: userOwner._id,
            title, 
            address, 
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        await newPlace.save();

        // adding the hotel id to the user 
        const Updateuser = await User.findByIdAndUpdate(userOwner._id, {$push: {places: newPlace._id}});
        res.json(Updateuser);
        res.json(newPlace);
        console.log(newPlace);
    } catch (error) {
        console.log("Error in handleAddPlace controller");
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const showPlaces = async(req, res) => {
    try {
        const creater = req.user;
        console.log(creater);
        const places = await PlaceModel.findById(_id);
        console.log(places);

    } catch (error) {
        console.log(error.message);
    }
}
