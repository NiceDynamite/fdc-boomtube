import Footer from "../Components/footer/Footer";
import Header from "../Components/header/HeaderMain";
import AboutMe from "../Components/myprofile-components/AboutMe";
import Favorites from "../Components/myprofile-components/Favorites";
import UserVideos from "../Components/myprofile-components/UserVideos";
import ViewHistory from "../Components/myprofile-components/ViewHistory";
import '../Css/MyProfile.css'



const MyProfile = () => {
    return (
        <div>
            <Header />
            <h1>Wayne Odell</h1>
            <img src="https://unsplash.it/300/200" alt="cant load" className="profile-Picture"/>
            <AboutMe />
            <Favorites />
            <UserVideos />
            <ViewHistory />
            <Footer />
        </div>
        
    )
}

export default MyProfile;