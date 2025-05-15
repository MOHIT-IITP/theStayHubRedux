import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addplace } from "../features/place/placeSlice";
import toast from "react-hot-toast";

const PlaceForm = () => {
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
    });

    const dispatch = useDispatch();

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addplace(formData));
            toast.success("Hotel added successfully!");

            // Optional: reset form after submission
            setFormData({
                title: "",
                address: "",
                description: "",
                perks: "",
                extraInfo: "",
                checkIn: "",
                checkOut: "",
                maxGuests: "",
                price: "",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
            <form onSubmit={handleFormSubmit} className="form-card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="label-style">Name of the Hotel</label>
                        <input
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="label-style">Address</label>
                        <input
                            name="address"
                            placeholder="e.g. Times Square, New York"
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="label-style">Description</label>
                        <input
                            name="description"
                            type="text"
                            placeholder="Description of the hotel"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="label-style">Perks</label>
                        <input
                            name="perks"
                            type="text"
                            placeholder="Perks of the hotel"
                            value={formData.perks}
                            onChange={handleChange}
                            className="input-style"
                        />
                    </div>
                    <div>
                        <label className="label-style">Extra Info (Hotel)</label>
                        <input
                            name="extraInfo"
                            placeholder="Extra info here"
                            value={formData.extraInfo}
                            onChange={handleChange}
                            type="text"
                            className="input-style"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label-style">Check-in</label>
                            <input
                                name="checkIn"
                                placeholder="Check-in time"
                                value={formData.checkIn}
                                onChange={handleChange}
                                type="number"
                                className="input-style"
                            />
                        </div>
                        <div>
                            <label className="label-style">Check-out</label>
                            <input
                                name="checkOut"
                                placeholder="Check-out time"
                                value={formData.checkOut}
                                onChange={handleChange}
                                type="number"
                                className="input-style"
                            />
                        </div>
                        <div>
                            <label className="label-style">Max Guests</label>
                            <input
                                name="maxGuests"
                                placeholder="1"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                type="number"
                                className="input-style"
                            />
                        </div>
                        <div>
                            <label className="label-style">Price</label>
                            <input
                                name="price"
                                placeholder="2999"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className="input-style"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PlaceForm;
