import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingInfo } from "../features/booking/bookingSlice";
import { useParams } from "react-router-dom";

const BookingInfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookingInfo(id));
  }, [dispatch, id]);

  // Assuming booking details are stored in Redux state as booking.bookingInfo
  const booking = useSelector((state) => state.booking.booking[0]);

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-violet-600 border-opacity-30"></div>
        <span className="ml-4 text-lg text-gray-500">Loading booking details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 rounded-3xl shadow-2xl p-10 border border-violet-200 bg-white/30 backdrop-blur-lg bg-gradient-to-br from-white/60 via-violet-100/40 to-violet-200/30 transition-all duration-300">
      <button
        onClick={() => window.location.href = "/booking"}
        className="mb-8 flex items-center gap-2 text-violet-700 hover:text-black font-semibold transition-colors"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Bookings
      </button>
      <h2 className="text-4xl font-extrabold mb-10 text-violet-800 flex items-center gap-3 drop-shadow-lg">
        <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M9 17v-2a4 4 0 014-4h3m4 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"></path>
        </svg>
        Booking Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Title</p>
          <p className="font-semibold text-gray-900/90">{booking.title || "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Check In</p>
          <p className="font-semibold text-gray-900/90">{booking.checkIn ? new Date(booking.checkIn).toLocaleString() : "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Check Out</p>
          <p className="font-semibold text-gray-900/90">{booking.checkOut ? new Date(booking.checkOut).toLocaleString() : "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Name</p>
          <p className="font-semibold text-gray-900/90">{booking.name || "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Phone</p>
          <p className="font-semibold text-gray-900/90">{booking.phone || "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Price</p>
          <p className="font-semibold text-gray-900/90">${typeof booking.price === "number" ? booking.price : "N/A"}</p>
        </div>
        <div>
          <p className="text-violet-500 text-xs font-semibold uppercase mb-1 tracking-wider">Status</p>
          <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm bg-white/60 ${booking.status === "accepted" ? "text-green-700 border border-green-200" : "text-yellow-700 border border-yellow-200"}`}>
            {booking.status || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
export default BookingInfoPage;
