import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addplace } from "../features/place/placeSlice";
import { useNavigate } from "react-router-dom"; 
import PhotosUploader from "./PhotoUploader";
import { toast } from "react-toastify";


const PlaceForm = () => {

    const [formData, setFormData] = useState({
        title: "",
        address: "",
        addedPhotos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
        price: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.title.trim()) return toast.error("Title is required");
        if (!formData.address.trim()) return toast.error("Address is required");
        if (!formData.description.trim()) return toast.error("Description is required");
        if (!formData.perks.trim()) return toast.error("Perks is required");
        if (!formData.extraInfo.trim()) return toast.error("Extra Info is required");
        if (!formData.checkIn.toString().trim()) return toast.error("Check-in time is required");
        if (!formData.checkOut.toString().trim()) return toast.error("Check-out time is required");
        if (!formData.maxGuests.toString().trim()) return toast.error("Max guests is required");
        if (!formData.price.toString().trim()) return toast.error("Price is required");

        return true;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await dispatch(addplace(formData)).unwrap();
                toast.success("Hotel added successfully!");
                setFormData({
                    title: "",
                    address: "",
                    description: "",
                    addedPhotos: [],
                    perks: "",
                    extraInfo: "",
                    checkIn: "",
                    checkOut: "",
                    maxGuests: "",
                    price: "",
                });
                navigate('/place'); // <-- use navigate here
            } catch (error) {
                toast.error("Failed to add hotel");
            }
        } else {
            toast.error("handle Place Failed");
        }
    };

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
            <form onSubmit={handleFormSubmit} className="backdrop-blur-xl bg-white/60 border border-blue-100 w-full rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
                    Add New Hotel
                </h2>
                <div className="space-y-6">
                    {/* Hotel Name */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Hotel Name</label>
                        <input
                            name="title"
                            placeholder="Luxury Resort & Spa"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Address</label>
                        <input
                            name="address"
                            placeholder="123 Paradise Street, Maldives"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe your property..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition h-32"
                        />
                    </div>
                    {/* Amenities */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Amenities (comma separated)</label>
                        <input
                            name="perks"
                            placeholder="Pool, Free WiFi, Spa, Breakfast"
                            value={formData.perks}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    {/* Photos */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Photos</label>
                        <PhotosUploader
                            addedPhotos={formData.addedPhotos || []}
                            onChange={(photos) => setFormData({ ...formData, addedPhotos: photos })}
                        />
                    </div>
                    {/* Additional Info */}
                    <div>
                        <label className="block text-violet-700 font-semibold text-2xl mb-2">Additional Info</label>
                        <textarea
                            name="extraInfo"
                            placeholder="Check-in procedures, special notes..."
                            value={formData.extraInfo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition h-32"
                        />
                    </div>
                    {/* Grid Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Check-in Time */}
                        <div>
                            <label className="block text-violet-700 font-semibold text-xl mb-2">Check-in Time</label>
                            <input
                                name="checkIn"
                                placeholder="14"
                                value={formData.checkIn}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        {/* Check-out Time */}
                        <div>
                            <label className="block text-violet-700 font-semibold text-xl mb-2">Check-out Time</label>
                            <input
                                name="checkOut"
                                placeholder="11"
                                value={formData.checkOut}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        {/* Max Guests */}
                        <div>
                            <label className="block text-violet-700 font-semibold text-xl mb-2">Max Guests</label>
                            <input
                                name="maxGuests"
                                placeholder="4"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        {/* Price per Night */}
                        <div>
                            <label className="block text-violet-700 font-semibold text-xl mb-2">Price per Night ($)</label>
                            <input
                                name="price"
                                placeholder="299"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-400 to-violet-500 hover:from-blue-500 hover:to-violet-600 text-white rounded-xl transition-all duration-300 font-semibold shadow hover:shadow-lg"
                    >
                        Create Listing
                    </button>
                </div>
            </form>
        </div>
    </div>
);
};

export default PlaceForm;
