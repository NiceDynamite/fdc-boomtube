import '../../Pages/MyProfile.css'

const ProfileVideo = (props) => {
    let videoUrl = null;
    let videoTitle = null;
    console.log(props)
    fetch(`http://localhost:5001/videos/${props.video_id}`)
            .then((response) => response.json())
            .then((data) => { console.log(`this is the video data ${data}`)})
    
    return (
        
        <div className='myprofilevideo' >Uploaded video 1</div>
        
    )
}

export default ProfileVideo