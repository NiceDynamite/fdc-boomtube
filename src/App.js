import React from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
// const userId = {user_id: 1};
// let usableUserData={};
// componentDidMount() {
//     fetch(`http://localhost:5000/users`,{
//              method: 'POST',
//              headers: {
//                  'Content-Type': 'application/json'
//              },
//                  body: JSON.stringify(userId)
//              })
//          .then((response) => response.json())
//          .then((data) => {localStorage.setItem('userData', JSON.stringify(data)); console.log(data)})
//          .then(() => console.log("Mounted user data"))
//          .then(() => usableUserData=JSON.parse(localStorage.userData))
//          .then(() => console.log(usableUserData.username));
// }
export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </>
    )
}