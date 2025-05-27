import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";

export default function Navbar() {
  const user = useSelector(selectUser);

  return (
    <header className="flex overflow-x-hidden justify-between items-center flex-wrap px-6 py-4
      bg-white/60 backdrop-blur-md shadow-md rounded-b-2xl border-b border-violet-100
      sticky top-0 z-50">
      {/* Left section: Logo */}
      <Link to={"/"} className="flex items-center gap-2 font-bold hover:scale-105 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="url(#logo-gradient)"
          className="w-8 h-8"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-violet-500 to-blue-400 bg-clip-text text-transparent">
          TheStay<span className="text-violet-600">Hub</span>
        </span>
      </Link>

      {/* Right section: Profile */}
      <Link
        to={"/profile"}
        className="flex items-center gap-3 py-2 px-5 rounded-full border border-violet-200
        bg-gradient-to-r from-blue-100/70 via-white/60 to-violet-100/70
        shadow-lg hover:shadow-xl hover:scale-105 transition"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-violet-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        {!!user && (
          <span className="text-lg font-semibold text-gray-800">
            {user.fullName}
          </span>
        )}
      </Link>
    </header>
  );
}
