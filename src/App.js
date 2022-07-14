import React from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import MyProfile from "./Pages/MyProfilePage";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/myprofile" element={<MyProfile />} />
                {/* <Route path="/upload" element={<UploadPage />} /> */}
            </Routes>
        </>
    )
}