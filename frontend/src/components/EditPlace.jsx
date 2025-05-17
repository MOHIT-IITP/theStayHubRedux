import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"; 
import { editPlace } from "../features/auth/authSlice";
import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";

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
    });
    useEffect(() => {
        const fetchData = async(req) => {
            try {
                const res = await axiosInstance.get(`/places/${id}`);
                setFormData({
                    ...res.data,
                })
            } catch (error) {
                console.log("Error in fetching place")
            }
        }
        fetchData();
    }, [id])

    const dispatch = useDispatch();
    const navigate = useNavigate(); // <-- use this

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
            <form onSubmit={handleFormUpdate} className="form-card">
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
                    Edit  
                </button>
            </form>
        </div>
    );
};

export default EditPlace;
