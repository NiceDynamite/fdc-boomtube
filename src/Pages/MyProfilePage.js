import Footer from "../Components/footer/Footer";
import Header from "../Components/header/HeaderMain";
import AboutMe from "../Components/myprofile-components/AboutMe";
import Favorites from "../Components/myprofile-components/Favorites";
import UserVideos from "../Components/myprofile-components/UserVideos";
import ViewHistory from "../Components/myprofile-components/ViewHistory";
import './MyProfile.css'
import { useNavigate } from "react-router-dom";



const MyProfile = (props) => {
    const nav = useNavigate();
    console.log(`in profile ${props.userData.favorites}`)
    if(props.userData.username == "No user"){
    return (
        <>
            {nav("/home")}
        </>
    )}
    return(
        <div>          
            <Header userData={props.userData} setUserData={props.setUserData}/>
            <div className="profileContainerTop">
                <div className="profileContainer2">
                <h1 id="userNameMyProfile">{props.userData.username}</h1>
                <img src={props.userData.avatar_url} alt="cant load" className="profile-Picture"/>
                </div>
                <div className="profileContainer2">
                <AboutMe userData={props.userData}/>
                </div>
            </div>
            <div className="profileContainerBottom">
                <UserVideos userData={props.userData}/>
                <ViewHistory userData={props.userData}/>
            </div>
            <Footer />           
        </div>
    )
}

export default MyProfile;