import { useDispatch, useSelector } from "react-redux";
import ProfileComp1 from "./ProfileComp1";
import { useEffect } from "react";
import { deletebooking, selectUser, showBookingPlaces } from "../features/auth/authSlice";
import { placeinfo } from "../features/place/placeSlice";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const bookings = useSelector((state) => state.auth.user.bookings || []);

  useEffect(() => {
    dispatch(showBookingPlaces());
  }, [dispatch]);

  // Sort bookings by createdAt or checkIn (latest first)
  const sortedBookings = [...bookings].sort((a, b) => {
    // Prefer createdAt if available, else fallback to checkIn
    const dateA = new Date(a.createdAt || a.checkIn || 0);
    const dateB = new Date(b.createdAt || b.checkIn || 0);
    return dateB - dateA;
  });

  const redirectToHotelPage = (bookingId) => {
    dispatch(placeinfo(bookingId));
  }

  const handleDeleteBooking = async (bookingId, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await dispatch(deletebooking(bookingId)).unwrap();
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4">
      <ProfileComp1 />
      <div className="flex justify-center items-center mt-16">
        <div className="backdrop-blur-xl bg-white/70 border border-blue-200 rounded-3xl shadow-2xl px-10 py-16 text-center w-full max-w-7xl">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow-lg tracking-tight">
            Your Bookings
          </h2>
          {sortedBookings.length === 0 ? (
            <p className="text-lg text-gray-700">You have no bookings yet.</p>
          ) : (
            <ul className="space-y-6 mt-8">
              {sortedBookings.map((booking) => {
                let statusColor = "text-blue-700 bg-blue-100";
                if (booking.status === "accepted") statusColor = "text-green-700 bg-green-100";
                else if (booking.status === "rejected") statusColor = "text-red-700 bg-red-100";
                return (
                  <Link to={`/booking/${booking._id}`} className="no-underline" key={booking._id}>
                  <li
                    key={booking._id}
                    className="relative mt-4 bg-white/90 border border-blue-100 rounded-2xl shadow-lg p-6 text-left hover:shadow-2xl transition-shadow"
                    onClick={() => redirectToHotelPage(booking.place)}
                  >
                    <button
                      onClick={(e) => handleDeleteBooking(booking._id, e)}
                      className="absolute top-4 right-4 bg-gradient-to-br from-red-400 to-red-600 text-white rounded-full p-2 text-xs hover:scale-110 shadow-md transition"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                    <div className="font-bold text-2xl text-blue-800 mb-2">
                      {booking.title}
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                      <span className="bg-blue-50 px-3 py-1 rounded-full">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                      <span className="bg-violet-50 px-3 py-1 rounded-full">
                        Guests: <span className="font-semibold">{booking.name}</span>
                      </span>
                      <span className={`px-3 py-1 rounded-full font-semibold ${statusColor}`}>
                        Status: {booking.status}
                      </span>
                      {booking.status === 'rejected' && (
                        <span className=" animate-bounce bg-red-50 font-semibold px-3 py-1 rounded-full text-red-700">
                          Delete this booking
                        </span>
                      )}
                      {booking.status === 'rejected' && (
                        <span className=" bg-yellow-50 font-semibold px-3 py-1 rounded-full text-yellow-700">
                          {booking.reasonCancel}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-2">
                      <span className="bg-yellow-50 px-3 py-1 rounded-full">
                        Phone: <span className="font-medium">{booking.phone}</span>
                      </span>
                      <span className="bg-pink-50 px-3 py-1 rounded-full">
                        Price: <span className="font-medium">${booking.price}</span>
                      </span>
                    </div>
                    
                  </li>
                  </Link>
                );
              })}
              <li className="flex justify-center mt-8">
                <button
                  onClick={() => dispatch(showBookingPlaces())}
                  className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-200/80 to-violet-200/80 hover:from-blue-300/80 hover:to-violet-300/80 text-blue-900 rounded-xl transition-all duration-300 font-semibold shadow flex items-center justify-center"
                >
                  Refresh Bookings
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;