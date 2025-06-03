import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeinfo } from "../features/place/placeSlice";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { selectUser } from "../features/auth/authSlice";

const HotelPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const place = useSelector((state) => state.place.place);
    const [showGallery, setShowGallery] = useState(false);
    const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

    useEffect(() => {
        dispatch(placeinfo(id));
    }, [dispatch, id]);

    const user = useSelector(selectUser);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            {/* Fullscreen Photo Modal */}
            {fullscreenPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                    onClick={() => setFullscreenPhoto(null)}
                >
                    <img
                        src={fullscreenPhoto}
                        alt="Full size hotel"
                        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
                    />
                    <button
                        className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition"
                        onClick={e => { e.stopPropagation(); setFullscreenPhoto(null); }}
                        title="Close"
                    >
                        &times;
                    </button>
                </div>
            )}
            {/* Gallery Modal */}
            {showGallery && place.photos && place.photos.length > 0 && (
                <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-95 overflow-auto">
                    <button
                        className="absolute top-36 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition"
                        onClick={() => setShowGallery(false)}
                        title="Close Gallery"
                    >
                        &times;
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 w-full max-w-6xl">
                        {place.photos.map((photo, idx) => (
                            <div key={idx} className="h-80 rounded-2xl overflow-hidden shadow cursor-pointer flex items-center justify-center bg-white/10" onClick={() => setFullscreenPhoto(photo)}>
                                <img
                                    src={photo}
                                    alt={`Hotel photo ${idx + 1}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="max-w-full mx-auto">
                <div className="backdrop-blur-xl p-8">
                    {place ? (
                        <>
                            {/* Header Section */}
                            <div className="mb-8 text-center">
                                <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">{place.title}</h1>
                                <p className="text-lg text-violet-700/80 flex flex-col">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline hover:text-blue-700 transition"
                                        title="View on Google Maps"
                                    >
                                        {place.address}
                                    </a>
                                <label htmlFor="" className="text-sm  text-neutral-500">Click to View on Google Map</label>
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {place.photos && place.photos.length > 0 && (
                                <div className="mb-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {place.photos.slice(0, 2).map((photo, idx) => (
                                            <div key={idx} className="h-100 rounded-2xl overflow-hidden shadow cursor-pointer" onClick={() => setFullscreenPhoto(photo)}>
                                                <img
                                                    src={photo}
                                                    alt={`Hotel photo ${idx + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {place.photos.length > 2 && (
                                        <div className="flex justify-center mt-4">
                                            <button
                                                className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-violet-600 transition"
                                                onClick={() => setShowGallery(true)}
                                            >
                                                View All Photos
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Details Section */}
                            <div className="flex flex-col md:flex-row max-w-3xl mx-auto justify-center items-start gap-8">
                                {/* Left Column */}
                                <div className="flex-1 space-y-6 w-full max-w-md">
                                <div className="flex-1 space-y-6 w-full">
                                    <div className="backdrop-blur-sm ">
                                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">Description</h2>
                                        <p className="text-gray-700 leading-relaxed">{place.description}</p>
                                    </div>

                                    <div className="backdrop-blur-sm ">
                                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">Perks</h2>
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
                                    <div className="backdrop-blur-sm mt-5 ">
                                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">Additional Info</h2>
                                        <p className="text-gray-700 leading-relaxed">{place.extraInfo}</p>
                                    </div>
                                </div>
                                </div>
                            </div>

                                {/* Right Column */}
                                <div className="flex-1 space-y-6 w-full max-w-md">
                                    <div className="backdrop-blur-sm bg-white/90 p-6 rounded-xl border border-blue-100">
                                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">Details</h2>
                                        <div className="grid grid-cols-2 text-gray-700 text-sm">
                                            <div className="border-r border-dashed border-black/30 flex flex-col items-center gap-1 border-b pb-2">
                                                <p className="font-medium">Check-in</p>
                                                <p>{place.checkIn}:00</p>
                                            </div>
                                            <div className="border-b border-dashed border-black/30 pb-2 flex flex-col items-center gap-1">
                                                <p className="font-medium">Check-out</p>
                                                <p>{place.checkOut}:00</p>
                                            </div>
                                            <div className="border-r border-dashed border-black/30 pt-2 flex flex-col items-center gap-1">
                                                <p className="font-medium">Max Guests</p>
                                                <p>{place.maxGuests}</p>
                                            </div>
                                            <div className="pt-2 flex flex-col items-center gap-1">
                                                <p className="font-medium">Price</p>
                                                <p>
                                                    <span className="text-blue-700 font-semibold">${place.price}</span>/night
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="backdrop-blur-sm bg-white/90 p-4 rounded-xl border border-blue-100 mt-4">
                                        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">Location Map</h2>
                                        <div className="w-full h-64 rounded-lg overflow-hidden shadow">
                                            <iframe
                                                title="Google Map"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                allowFullScreen
                                                referrerPolicy="no-referrer-when-downgrade"
                                                src={`https://www.google.com/maps?q=${encodeURIComponent(place.address)}&output=embed`}
                                            ></iframe>
                                        </div>
                                    </div>

                                    {user && user.role === "user" && <BookingForm />}
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

