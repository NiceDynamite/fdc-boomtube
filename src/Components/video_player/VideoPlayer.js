import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer(props) {
    console.log("in Video Player");
    console.log(props.video_url);

    return (
        /*
        To use the react-player
            npm install react-player (npm install in this case)
            You need the above import statments
        You can control the player's size with height/width props (width='420px')
        To have the video's controls on the player, you need to pass the 'controls' prop
        React-Player works with most popular video sharing urls. Just plug it in, as below
        */
        <ReactPlayer className='video_player' controls url={props.video_url} width="80vw" height="55vh"/>
    )
}