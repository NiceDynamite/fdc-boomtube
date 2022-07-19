import { useState } from 'react';
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import './HomePage.css';
import VideoPlayer from '../Components/video_player/VideoPlayer';
import { useNavigate } from "react-router-dom";


const HomePage = (props) => {
    const nav = useNavigate();
    const playVideo = (url) => {
        props.setUrl(url);
        nav('/play');
    }
    console.log(props.videos[0])
    console.log(props.userData);
    
    return(
        <div id="home-page">
            <Header userData={props.userData} setUserData={props.setUserData} setUrl={props.setUrl}/>
            <div className="homeVideoContainer">
                <div classname="vidBox"><p>{props.videos[0].title}</p><img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[0].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[1].title}</p><img src={props.videos[1].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[1].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[2].title}</p><img src={props.videos[2].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[2].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[3].title}</p><img src={props.videos[3].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[3].video_url)}}></img></div>
            </div>
            <div className="homeVideoContainer">
                <div classname="vidBox"><p>{props.videos[4].title}</p><img src={props.videos[4].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[4].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[5].title}</p><img src={props.videos[5].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[5].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[6].title}</p><img src={props.videos[6].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[6].video_url)}}></img></div>
                <div classname="vidBox"><p>{props.videos[7].title}</p><img src={props.videos[7].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[7].video_url)}}></img></div>
            </div>
            <Footer />
        </div>

    )
    
}

export default HomePage;