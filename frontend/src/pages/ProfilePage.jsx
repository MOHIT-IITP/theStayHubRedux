import { useDispatch, useSelector } from "react-redux"
import { logoutThunk, selectUser } from "../features/auth/authSlice"
import ProfileComp1 from "../components/ProfileComp1";
import { use } from "react";

const ProfilePage = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200 py-12 px-4">
            <ProfileComp1 />
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="backdrop-blur-xl bg-white/30 border border-blue-100 rounded-3xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">Profile</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700">User Fullname:</span>
                            <span className="text-lg text-violet-700 font-medium mt-1">
                                {user ? user?.fullName : <span className="text-red-500">User fullname not found</span>}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700">User Email:</span>
                            <span className="text-lg text-violet-700 font-medium mt-1">
                                {user ? user?.email : <span className="text-red-500">User email not found</span>}
                            </span>
                            <span>
                                {user ? (
                                    <span className="text-sm text-gray-500 mt-1">
                                        User Role: {user?.role}
                                    </span>
                                ) : (
                                    <span className="text-red-500 text-sm mt-1">User role not found</span>
                                )}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-200/80 to-violet-200/80 hover:from-blue-300/80 hover:to-violet-300/80 text-blue-900 rounded-xl transition-all duration-300 font-semibold shadow flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-7 h-7 animate-spin"
                                >
                                    <path d="M11.9995 2C12.5518 2 12.9995 2.44772 12.9995 3V6C12.9995 6.55228 12.5518 7 11.9995 7C11.4472 7 10.9995 6.55228 10.9995 6V3C10.9995 2.44772 11.4472 2 11.9995 2ZM11.9995 17C12.5518 17 12.9995 17.4477 12.9995 18V21C12.9995 21.5523 12.5518 22 11.9995 22C11.4472 22 10.9995 21.5523 10.9995 21V18C10.9995 17.4477 11.4472 17 11.9995 17ZM20.6597 7C20.9359 7.47829 20.772 8.08988 20.2937 8.36602L17.6956 9.86602C17.2173 10.1422 16.6057 9.97829 16.3296 9.5C16.0535 9.02171 16.2173 8.41012 16.6956 8.13398L19.2937 6.63397C19.772 6.35783 20.3836 6.52171 20.6597 7ZM7.66935 14.5C7.94549 14.9783 7.78161 15.5899 7.30332 15.866L4.70525 17.366C4.22695 17.6422 3.61536 17.4783 3.33922 17C3.06308 16.5217 3.22695 15.9101 3.70525 15.634L6.30332 14.134C6.78161 13.8578 7.3932 14.0217 7.66935 14.5ZM20.6597 17C20.3836 17.4783 19.772 17.6422 19.2937 17.366L16.6956 15.866C16.2173 15.5899 16.0535 14.9783 16.3296 14.5C16.6057 14.0217 17.2173 13.8578 17.6956 14.134L20.2937 15.634C20.772 15.9101 20.9359 16.5217 20.6597 17ZM7.66935 9.5C7.3932 9.97829 6.78161 10.1422 6.30332 9.86602L3.70525 8.36602C3.22695 8.08988 3.06308 7.47829 3.33922 7C3.61536 6.52171 4.22695 6.35783 4.70525 6.63397L7.30332 8.13398C7.78161 8.41012 7.94549 9.02171 7.66935 9.5Z"></path>
                                </svg>
                            ) : (
                                "Log Out"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
