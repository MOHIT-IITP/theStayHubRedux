import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout.jsx";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { checkAuth, selectUser } from "./features/auth/authSlice";
import ProfilePage from "./pages/ProfilePage.jsx";
import BookingPage from "./components/BookingPage.jsx";
import AddPlace from "./components/AddPlace.jsx";
import PlaceForm from "./components/PlaceForm.jsx";
import EditPlace from "./components/EditPlace.jsx";
import HotelPage from "./pages/HotelPage.jsx";
import BookingReq from "./components/BookingReq.jsx";
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-gray-200">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={!user ? <LoginPage /> : <ProfilePage />}
          />
          <Route
            path="/booking"
            element={!user ? <LoginPage /> : <BookingPage />}
          />
          <Route path="/place" element={!user ? <LoginPage /> : <AddPlace />} />
          <Route path="/form" element={!user ? <LoginPage /> : <PlaceForm />} />
          <Route
            path="/editplace/:id"
            element={!user ? <LoginPage /> : <EditPlace />}
          />
          <Route
            path="/hotelpage/:id"
            element={!user ? <LoginPage /> : <HotelPage />}
          />
          <Route
            path="/bookingReq"
            element={!user ? <LoginPage /> : <BookingReq />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
