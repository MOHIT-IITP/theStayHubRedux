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


export const updatePlace = async(req, res) => {
    try {
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
        } = req.body;
        const placeid = req.params;
        const userid = req.user._id;

        const checkPlace = await PlaceModel.findById(placeid);
        if(!checkPlace){
            return res.status(400).json({message: "Place not found"});
        }

        const updatedPlace = await PlaceModel.findOneAndUpdate({_id: placeid, owner:userid}, {
            $set: {
                title, 
                address,
                description,
                perks: perks.split(','),
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            }
        }, {new: true, runValidators: true});

        if(!updatedPlace){
            return res.status(400).json({message: "Place not found or unauthorized"});
        }
        res.json({message: "Place updated Successfully", place: updatedPlace});

    } catch (error) {
        console.log("Error in update place controller");
        return res.status(500).json(error.message);
    }
}
