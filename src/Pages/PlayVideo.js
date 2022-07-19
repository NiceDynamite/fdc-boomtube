import { useState } from 'react';
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import './Suggestion.css';
import VideoPlayer from '../Components/video_player/VideoPlayer';


const PlayVideo = (props) => {
    const playVideo = (url) => {
        props.setUrl(url);
    }
    console.log(props.videos[0])
    console.log(props.userData);
        return(
            <div id="video-page">
                <Header userData={props.userData} setUserData={props.setUserData} setUrl={props.setUrl}/>
                <div className="videoAndSuggestionContainer">
                <VideoPlayer video_url={props.url}/>
                    <div className="suggestionContainer">
                        <div className="suggestionBox"><img src={props.videos[0].thumbnail_url} alt="Video thumbnail" onClick={() => {playVideo(props.videos[0].video_url)}}></img></div>
                        <div className="suggestionBox"><img src={props.videos[1].thumbnail_url} alt="Video thumbnail" onClick={() => {playVideo(props.videos[1].video_url)}}></img></div>
                        <div className="suggestionBox"><img src={props.videos[2].thumbnail_url} alt="Video thumbnail" onClick={() => {playVideo(props.videos[2].video_url)}}></img></div>
                    </div>
                    
                </div>
                <div className='SuggestionDiscriptionContainer'>
                        <div className="discriptionBox">Discription: {props.videos[0].discription}</div>
                </div>
                <div className='SuggestionCommentContainer'>
                        <div className="commentBox">Comments Here?     I dont know where.</div>
                </div>
                <Footer />
            </div>
    
        )
    
}

export default PlayVideo;