import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import MyProfile from "./Pages/MyProfilePage";
import PlayVideo from "./Pages/PlayVideo"
import Loading from "./Loading";

export default function App() {
    let [ userData, setUserData ] = React.useState({user_id: 0, username: "No user", about: null, avatar_url: null, darkmode: false, uploads_count: 0, uploads: [], favorites: [], history: []});
    let [ videosState, setVideosState ] = React.useState();
    let [ loading, setLoading ] = React.useState(true);
    let [ url, setUrl ] = React.useState("No Video");
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
                <Route path="/login" element={<LoginPage userData={userData} setUserData={setUserData}/>} />
                <Route path="/signup" element={<SignupPage userData={userData} setUserData={setUserData}/>} />
                <Route path="/home" element={<HomePage videos={videosState} userData={userData} setUrl={setUrl} setUserData={setUserData}/>} />
                <Route path="/myprofile" element={<MyProfile userData={userData} setUserData={setUserData}/>} />
                <Route path="/play" element={<PlayVideo videos={videosState} userData={userData} setUserData={setUserData} url={url} setUrl={setUrl}/>} />
            </Routes>
        </>
    )
}