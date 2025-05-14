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
const App = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    console.log(user);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/"
                        element={user ? <HomePage /> : <Navigate to="/login" />}
                    />
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
                        element={!user ? <LoginPage /> : <ProfilePage/>}
                    />
                    <Route
                        path="/booking"
                        element={!user ? <LoginPage /> : <BookingPage/>}
                    />
                    <Route
                        path="/place"
                        element={!user ? <LoginPage /> : <AddPlace/>}
                    />
                </Route>

            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
