import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; 
import { editPlace } from "../features/auth/authSlice";
import { axiosInstance } from "../lib/axiosInstance";
import PhotosUploader from "./PhotoUploader";
import { toast } from "react-toastify";

const EditPlace = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        perks: "",
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
        price: "",
        addedPhotos: [],
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/places/${id}`);
                setFormData({
                    ...res.data,
                    addedPhotos: res.data.photos || [], // Ensure addedPhotos is set from backend photos
                });
            } catch (error) {
                console.log("Error in fetching place")
            }
        }
        fetchData();
    }, [id])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormUpdate = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editPlace({ placeid: id, formData })).unwrap();
            toast.success("Hotel edited successfully!");
            navigate('/place');
        } catch (error) {
            toast.error(error.message || "Edit failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4 flex items-center justify-center">
            <form 
                onSubmit={handleFormUpdate} 
                className="max-w-2xl w-full backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl p-8"
            >
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
                    Edit Hotel Listing
                </h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name of the Hotel</label>
                        <input
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input
                            name="address"
                            placeholder="e.g. Times Square, New York"
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Description</label>
                        <input
                            name="description"
                            type="text"
                            placeholder="Description of the hotel"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Perks</label>
                        <input
                            name="perks"
                            type="text"
                            placeholder="Perks of the hotel"
                            value={formData.perks}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Extra Info (Hotel)</label>
                        <textarea
                            name="extraInfo"
                            placeholder="Extra info here"
                            value={formData.extraInfo}
                            onChange={handleChange}
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Check-in</label>
                            <input
                                name="checkIn"
                                placeholder="Check-in time"
                                value={formData.checkIn}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Check-out</label>
                            <input
                                name="checkOut"
                                placeholder="Check-out time"
                                value={formData.checkOut}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Max Guests</label>
                            <input
                                name="maxGuests"
                                placeholder="1"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Price</label>
                            <input
                                name="price"
                                placeholder="2999"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className="w-full px-4 py-2 rounded-lg border border-violet-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70 transition"
                            />
                        </div>
                    </div>
                    <div>
                    <label className="block text-gray-700 font-semibold mb-2">Photos</label>
                    <PhotosUploader
                        addedPhotos={formData.addedPhotos || []}
                        onChange={(photos) => setFormData({ ...formData, addedPhotos: photos })}
                    />
                </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full mt-8 py-3 px-6 bg-gradient-to-r from-blue-400 to-violet-500 hover:from-blue-500 hover:to-violet-600 text-white rounded-xl transition-all duration-300 font-semibold shadow hover:shadow-lg"
                >
                    Edit  
                </button>
            </form>
        </div>
    );
};

export default EditPlace;
