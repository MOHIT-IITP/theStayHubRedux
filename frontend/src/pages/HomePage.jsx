import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getplace } from "../features/place/placeSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { isLoading } = useSelector((state) => state.place);
    const places = useSelector((state) => state.place.place); // <-- assuming this is your array
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getplace());
    }, [dispatch]);

    return (
        <div className="min-h-screen py-20 ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center drop-shadow">
                    Welcome to the Home Page
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {isLoading && <div>Loading</div>}
                    {places && places.length > 0 ? (
                        places.map((place) => (
                            <Link
                                to={`/hotelpage/${place?._id}`}
                                key={place._id}
                                className="relative backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Show first photo if available */}
                                {place.photos && place.photos.length > 0 && (
                                    <img
                                        src={place.photos[0]}
                                        alt={place.title}
                                        className="w-full h-48 object-cover rounded-2xl mb-4"
                                    />
                                )}
                                <h3 className="text-xl font-semibold mb-2 text-blue-900 group-hover:text-violet-700 transition">{place?.title}</h3>
                                <p className="text-gray-600 mb-4">{place?.address}</p>
                                <p className="text-2xl font-bold text-violet-600 mb-2">${place?.price}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {typeof place?.perks === "string"
                                        ? place.perks.split(",").map((perk, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-blue-800 text-xs font-medium shadow"
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full mr-2"></span>
                                                {perk.trim()}
                                            </span>
                                        ))
                                        : null}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 text-lg">
                            No places found.
                        </div>
                    )}
            </div>
        </div>
        </div>
    );
};

export default HomePage;
