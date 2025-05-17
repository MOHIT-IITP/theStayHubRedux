import React, { useEffect } from "react";
import ProfileComp1 from "./ProfileComp1";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, showPlaces, deletePlace  } from "../features/auth/authSlice";

const AddPlace = () => {
    const user  = useSelector(selectUser);
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
        <div className="p-6 bg-gray-50 min-h-screen">
            <ProfileComp1 />
            <div className="flex flex-col justify-center items-center my-10">
                <div className="mb-6">
                    <Link to={"/form"}>
                        <button className="border-2 border-black px-10 py-2 rounded-full bg-amber-200 hover:text-2xl hover:bg-amber-300 transition duration-300">
                            Add New Place
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {user && user?.places?.places && user?.places?.places?.map((place) => (
                        <div key={place._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 relative">
                            <button
                                onClick={() => handleDelete(place._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-xs hover:bg-red-700 transition"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                            </button>
                            <Link to={`/editplace/${place._id}`}>
                                <button
                                    className="absolute top-12 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-xs hover:bg-red-700 transition"
                                    title="Edit"
                                >
                                    <svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                </button>
                            </Link>
                            <h3 className="text-lg font-semibold mb-2">{place.title}</h3>
                            <p className="text-gray-600 mb-4">{place.address}</p>
                            <div className="text-2xl font-bold text-amber-600">${place.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddPlace;
