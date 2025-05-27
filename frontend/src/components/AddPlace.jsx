import React, { useEffect } from "react";
import ProfileComp1 from "./ProfileComp1";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, showPlaces, deletePlace } from "../features/auth/authSlice";

const AddPlace = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showPlaces());
    }, [dispatch]);

    const handleDelete = (placeId) => {
        if (window.confirm("Are you sure you want to delete this place?")) {
            dispatch(deletePlace(placeId));
        }
    };

    return (
        user.role === "admin" ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 p-6 pt-12">
            <ProfileComp1 />
            <div className="flex flex-col justify-center items-center my-10">
                <div className="mb-6">
                    <Link to={"/form"}>
                        <button className="border-2 border-blue-200 px-10 py-2 rounded-full bg-white/70 text-blue-900 font-semibold hover:bg-blue-100 hover:text-violet-700 transition duration-300 shadow">
                            Add New Place
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-7xl">
                    {user && user?.places?.places && user?.places?.places?.map((place) => (
                        <div
                            key={place._id}
                            className="relative backdrop-blur-xl  bg-white/60 border border-blue-100 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(place._id)}
                                className="absolute top-4 right-4 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-full p-2 text-xs hover:scale-110 shadow transition"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                            </button>
                            {/* Edit Button */}
                            <Link to={`/editplace/${place._id}`}>
                                <button
                                    className="absolute top-16 right-4 bg-gradient-to-br from-blue-400 to-violet-500 text-white rounded-full p-2 text-xs hover:scale-110 shadow transition"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                </button>
                            </Link>
                            {/* Card Content */}
                            <Link to={`/hotelpage/${place._id}`} className="block group">
                            <div className="flex gap-10 items-center ">
                            <div className="inline-block mb-4">
                                {place.photos && place.photos.length > 0 && (
                                    <img
                                        src={place.photos[0]}
                                        alt={place.title}
                                        className="w-58 h-48 object-cover rounded-2xl "
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-blue-900 group-hover:text-violet-700 transition">{place.title}</h3>
                                <p className="text-gray-600 mb-4">{place.address}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {place.perks?.split(",").map((perk, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-blue-800 text-xs font-medium shadow"
                                        >
                                            <span className="w-2 h-2 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full mr-2"></span>
                                            {perk.trim()}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-2xl mt-4 font-bold text-violet-600 mb-2"> <span className="text-lg">Price: </span> ${place.price}</div>
                            </div>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        ): (
            <div>
            user is not admin
            <Link to={"/profile"}>
                <button className="border-2 border-blue-200 px-10 py-2 rounded-full bg-white/70 text-blue-900 font-semibold hover:bg-blue-100 hover:text-violet-700 transition duration-300 shadow">
                    Go to Profile
                </button>
            </Link>
            </div>
        )
    );
};

export default AddPlace;
