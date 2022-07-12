import React from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
    )
}