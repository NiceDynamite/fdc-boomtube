import { useNavigate } from "react-router-dom";
import UploadVideo from '../fileupload/UploadVideo';
import UploadAvatar from "../fileupload/UploadAvatar";
const Navbar = (props) => {
    const nav = useNavigate();
    const signinSignout = () => {
        localStorage.clear();
        props.setUserData("");
        props.setUserData({username: "No user"});
    }
     
    if(props.userData.username == "No user"){
        return (
        <div className="navbar">
            <div onClick={() => {nav('/home'); props.setUrl("No Video")}}>Home</div>
            <div onClick={() => {nav("/login")}}>Login</div>
        </div>
    )}
    return (
        <div className="navbar">
            <div onClick={() => {nav('/home')}}>Home</div>
            <div onClick={() => {if(props.userData.username != "No user"){nav('/myprofile')}}}>My Profile</div>
            <UploadAvatar userData={props.userData} setUserData={props.setUserData}/>
            <UploadVideo userData={props.userData}/>         
            <div onClick={() => {signinSignout()}}>Signout</div>
        </div>
    )
}

export default Navbar;