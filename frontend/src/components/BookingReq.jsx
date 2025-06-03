import { useEffect, useState } from 'react';
import ProfileComp1 from './ProfileComp1';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleAcceptBooking,
  handleRejectBooking,
  showBooking,
} from '../features/booking/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookingReq = () => {
  const [reasons, setReasons] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(showBooking());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleAccept = async (id) => {
    try {
      await dispatch(handleAcceptBooking(id)).unwrap();
      toast.success('Booking accepted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Failed to accept booking');
    }
  };

  const handleReject = async (id) => {
    try {
      const reason = reasons[id] || '';
      if (!reason.trim()) {
        toast.warn('Please enter a reason before rejecting.');
        return;
      }
      await dispatch(handleRejectBooking({ id, reason })).unwrap();
      toast.success('Booking rejected successfully');
      navigate('/');
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Failed to reject booking');
    }
  };

  const handleReasonChange = (id, value) => {
    setReasons((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4">
      <ProfileComp1 />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
            Booking Requests
          </h2>
          <div className="flex flex-col gap-6 items-center w-full">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="w-full bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-blue-100"
                >
                  <div>
                    <strong>Hotel Name:</strong> {booking.title}
                  </div>
                  <div>
                    <strong>Name:</strong> {booking.name}
                  </div>
                  <div>
                    <strong>CheckIn:</strong> {formatDate(booking.checkIn)}
                  </div>
                  <div>
                    <strong>CheckOut:</strong> {formatDate(booking.checkOut)}
                  </div>
                  <textarea
                    className="w-full mt-2 p-2 border border-gray-300 rounded text-sm"
                    placeholder="Enter rejection reason..."
                    value={reasons[booking._id] || ''}
                    onChange={(e) => handleReasonChange(booking._id, e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold py-1 px-3 rounded"
                      onClick={() => handleAccept(booking._id)}
                    >
                      Accept Booking
                    </button>
                    <button
                      className="bg-red-200 hover:bg-red-300 text-red-900 font-semibold py-1 px-3 rounded"
                      onClick={() => handleReject(booking._id)}
                    >
                      Reject Booking
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No bookings found.</div>
            )}
            <button
              className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-200/80 to-violet-200/80 hover:from-blue-300/80 hover:to-violet-300/80 text-blue-900 rounded-xl transition-all duration-300 font-semibold shadow flex items-center justify-center"
              onClick={() => dispatch(showBooking())}
            >
              Refresh Booking Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingReq;
