import { Link, useLocation } from "react-router-dom";

const ProfileComp1 = () => {
    const location = useLocation();

    function linkClasses(path) {
        // Highlight the active tab
        const isActive = location.pathname === path;
        return `
            px-8 py-2 font-semibold rounded-full 
            border-2 
            transition-all duration-300
            shadow
            ${
                isActive
                    ? "bg-gradient-to-r from-blue-300 via-violet-200 to-blue-200 text-blue-900 border-blue-400 shadow-lg scale-105"
                    : "bg-white/60 text-gray-700 border-violet-200 hover:bg-blue-100/60 hover:text-violet-700 hover:scale-105"
            }
        `;
    }

    return (
        <div className="w-full flex justify-center items-center mx-auto gap-6 mb-8">
            <Link to="/profile" className={linkClasses("/profile")}>
                Profile
            </Link>
            <Link to="/booking" className={linkClasses("/booking")}>
                Bookings
            </Link>
            <Link to="/place" className={linkClasses("/place")}>
                Add Place
            </Link>
        </div>
    );
};

export default ProfileComp1;
