import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getplace } from "../features/place/placeSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoading, error } = useSelector((state) => state.place);
  const places = useSelector((state) => state.place.place) || []; 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getplace());
  }, [dispatch]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading places: {error}</div>
      </div>
    );
  }

  // Ensure places is an array and handle nested data structure
  const placesArray = Array.isArray(places) ? places : 
                     (places?.places && Array.isArray(places.places)) ? places.places :
                     (places?.data && Array.isArray(places.data)) ? places.data : [];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Loading places...
            </div>
          ) : placesArray.length > 0 ? (
            placesArray.map((place) => {
              // Skip invalid place objects
              if (!place || typeof place !== 'object') {
                console.error('Invalid place object:', place);
                return null;
              }

              // Safely handle perks
              const perksList = place?.perks ? 
                (typeof place.perks === 'string' ? place.perks.split(',') : 
                 Array.isArray(place.perks) ? place.perks : []) : 
                [];

              // Ensure all required fields are strings
              const title = String(place?.title || 'No Title');
              const address = String(place?.address || 'No Address');
              const price = String(place?.price || 'N/A');
              const ownerName = String(place?.owner?.fullName || place?.owner?.email || 'Unknown Owner');

              return (
                <Link
                  to={`/hotelpage/${place?._id || ''}`}
                  key={place?._id || Math.random()}
                  className="relative backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
                >
                  {place?.photos?.[0] && (
                    <img
                      src={place.photos[0]}
                      className="w-full h-48 object-cover rounded-2xl mb-4"
                      alt={title}
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-blue-900 group-hover:text-violet-700 transition">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {address}
                  </p>
                  <p className="text-2xl font-bold text-violet-600 mb-2">
                    ${price}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Owner: {ownerName}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {perksList.map((perk, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-blue-800 text-xs font-medium shadow"
                      >
                        <span className="w-2 h-2 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full mr-2"></span>
                        {String(perk).trim()}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })
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
