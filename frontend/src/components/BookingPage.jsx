import ProfileComp1 from "./ProfileComp1";

const BookingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4">
            <ProfileComp1 />
            <div className="flex justify-center items-center mt-16">
                <div className="backdrop-blur-xl bg-white/60 border border-blue-100 rounded-3xl shadow-xl px-10 py-16 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 drop-shadow">Your Bookings</h2>
                    <p className="text-lg text-gray-700">
                        Here you will see all your bookings.
                    </p>
                    {/* Add booking cards or table here in the future */}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
