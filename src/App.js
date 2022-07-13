import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import MyProfile from "./Pages/MyProfilePage";
import Loading from "./Loading";






export default function App() {
    let [ userData, setUserData ] = React.useState({username: "No user"});
    let [ videosState, setVideosState ] = React.useState();
    let [ loading, setLoading ] = React.useState(true);
    const videoCount= 8;
    let grabVideos = () => {
    fetch(`http://localhost:5001/video-array/${videoCount}`)
            .then((response) => response.json())
            .then((data) => { setLoading(false); setVideosState(data);})
    }
    useEffect(() => {
        grabVideos()
      },[]);

    if(loading){
        return (<Loading/>)
    }
    if(userData.username == "No user"){

    }
    return (
        <> 
            <Routes>
<<<<<<< HEAD
                <Route path="/login" element={<LoginPage userData={userData} setUserData={setUserData}/>} />
                <Route path="/signup" element={<SignupPage userData={userData} setUserData={setUserData}/>} />
                <Route path="/home" element={<HomePage videos={videosState} userData={userData} setUserData={setUserData}/>} />
                <Route path="/myprofile" element={<MyProfile userData={userData} setUserData={setUserData}/>} /> 
=======
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<HomePage />} />
>>>>>>> added functionaility and components
            </Routes>
        </>
    )
}