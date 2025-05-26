import { useDispatch, useSelector } from "react-redux";
import ProfileComp1 from "./ProfileComp1";
import { useEffect } from "react";
import { selectUser, showBookingPlaces } from "../features/auth/authSlice";

const BookingPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const bookings = useSelector((state) => state.auth.user.bookings || []);

  useEffect(() => {
    dispatch(showBookingPlaces());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4">
        <ProfileComp1/>
      <div className="flex justify-center items-center mt-16">
        <div className="backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl px-10 py-16 text-center w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 drop-shadow">
            Your Bookings
          </h2>
          {bookings.length === 0 ? (
            <p className="text-lg text-gray-700">You have no bookings yet.</p>
          ) : (
            <ul className="space-y-4 mt-6">
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="bg-white/80 border border-blue-200 rounded-xl shadow p-4 text-left"
                >
                  <div className="font-semibold text-2xl text-blue-800">
                    {booking.title} {/* Assuming populated place data */}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  <div className="text-gray-700">Guests: {booking.name}</div>
                  <div className="text-gray-700">Phone: {booking.phone}</div>
                  <div className="text-gray-700">Price: ${booking.price}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
