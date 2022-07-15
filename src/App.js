import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import axios from "axios";
import ReactPlayer from "react-player";

const videoCount= 6;
let loadedvideos={};
// axios.post(`http://localhost:5001/videos/${videoCount}`, {
//     user_id: response.data.id
// },
//     {
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': ` Bearer ${response.data.token}`
//         },

//     }).then(nav('/home'))


export default function App() {
    let [ userData, setUserData ] = React.useState({username: "No user"});
    let [ videos, setVideos ] = React.useState(loadedvideos);
    
    return (
        <>
                <Routes>
                    <Route path="/login" element={<LoginPage userData={userData} setUserData={setUserData}/>} />
                    <Route path="/signup" element={<SignupPage userData={userData} setUserData={setUserData}/>} />
                    <Route path="/home" element={<HomePage userData={userData} setUserData={setUserData}/>} />
                </Routes>
        </>
    )
}