import React from "react";
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

export default function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>

            </AuthProvider>
        </>
    )
}