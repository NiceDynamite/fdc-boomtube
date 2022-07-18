import { useState } from 'react';
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import './HomePage.css';
import VideoPlayer from '../Components/video_player/VideoPlayer';


const HomePage = (props) => {
    let [ url, setUrl ] = useState("No Video");
    const playVideo = (url) => {
        setUrl(url);
    }
    const handleVideoClose = () => {
        setUrl("No Video");
    }
    console.log(props.videos[0])
    console.log(props.userData);
    if(url == "No Video"){
        return(
            <div id="home-page">
                <Header userData={props.userData} setUserData={props.setUserData} setUrl={setUrl}/>
                <div className="container">
                    <div>{props.videos[0].title}<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[0].video_url)}}></img></div>
                    <div>{props.videos[1].title}<img src={props.videos[1].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[1].video_url)}}></img>{console.log(`in home ${JSON.stringify(props.userData)}`)}</div>
                    <div>{props.videos[2].title}<img src={props.videos[2].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[2].video_url)}}></img></div>
                    <div>{props.videos[3].title}<img src={props.videos[3].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[3].video_url)}}></img></div>
                    <div>{props.videos[4].title}<img src={props.videos[4].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[4].video_url)}}></img></div>
                    <div>{props.videos[5].title}<img src={props.videos[5].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[5].video_url)}}></img></div>
                    <div>{props.videos[6].title}<img src={props.videos[6].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[6].video_url)}}></img></div>
                    <div>{props.videos[7].title}<img src={props.videos[7].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[7].video_url)}}></img></div>
                </div>
                <Footer />
            </div>
    
        )
    }
    
    return(
        <div id="home-page">
            <Header userData={props.userData} setUserData={props.setUserData}/>
            <div>
                <VideoPlayer className="homeVideoPlayer" video_url={url}/>
                <div className="videoCloseButton" onClick={handleVideoClose}>Close Video</div>
            </div>
            
            <div className="container">
                <div>{props.videos[0].title}<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[0].video_url)}}></img></div>
                <div>{props.videos[1].title}<img src={props.videos[1].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[1].video_url)}}></img></div>
                <div>{props.videos[2].title}<img src={props.videos[2].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[2].video_url)}}></img></div>
                <div>{props.videos[3].title}<img src={props.videos[3].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[3].video_url)}}></img></div>
                <div>{props.videos[4].title}<img src={props.videos[4].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[4].video_url)}}></img></div>
                <div>{props.videos[5].title}<img src={props.videos[5].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[5].video_url)}}></img></div>
                <div>{props.videos[6].title}<img src={props.videos[6].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[6].video_url)}}></img></div>
                <div>{props.videos[7].title}<img src={props.videos[7].thumbnail_url} alt="Video thumbnail" className="HomeLogo" onClick={() => {playVideo(props.videos[7].video_url)}}></img></div>
            </div>
            <Footer />
        </div>

    )
    
}

export default HomePage;