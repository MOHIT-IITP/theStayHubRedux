import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeinfo } from "../features/place/placeSlice";
import { useParams } from "react-router-dom";

const HotelPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const place = useSelector((state) => state.place.place);

    useEffect(() => {
        dispatch(placeinfo(id));
    }, [dispatch, id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="backdrop-blur-xl bg-white/50 border border-blue-100 rounded-3xl p-8 shadow-2xl ring-1 ring-violet-200/30">
                    {place ? (
                        <>
                            {/* Header Section */}
                            <div className="mb-8 text-center">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">{place.title}</h1>
                                <p className="text-lg text-violet-700/80">{place.address}</p>
                            </div>

                            {/* Image Gallery Placeholder */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="h-64 bg-gradient-to-br from-blue-200/40 via-white/40 to-violet-200/40 rounded-2xl backdrop-blur-md shadow"></div>
                                <div className="h-64 bg-gradient-to-br from-violet-200/40 via-white/40 to-blue-200/40 rounded-2xl backdrop-blur-md shadow"></div>
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="backdrop-blur-sm bg-white/60 p-6 rounded-xl border border-violet-100">
                                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Description</h2>
                                        <p className="text-gray-700 leading-relaxed">{place.description}</p>
                                    </div>

                                    <div className="backdrop-blur-sm bg-white/60 p-6 rounded-xl border border-violet-100">
                                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Amenities</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {place.perks}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div className="backdrop-blur-sm bg-white/60 p-6 rounded-xl border border-blue-100">
                                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Details</h2>
                                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                                            <div>
                                                <p className="font-medium">Check-in</p>
                                                <p>{place.checkIn}:00</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">Check-out</p>
                                                <p>{place.checkOut}:00</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">Max Guests</p>
                                                <p>{place.maxGuests}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium">Price</p>
                                                <p>
                                                    <span className="text-blue-700 font-semibold">${place.price}</span>/night
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="backdrop-blur-sm bg-white/60 p-6 rounded-xl border border-blue-100">
                                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Additional Info</h2>
                                        <p className="text-gray-700 leading-relaxed">{place.extraInfo}</p>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <h1 className="text-2xl text-gray-600">Loading place details...</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelPage;
