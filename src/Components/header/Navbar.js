import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
    const nav = useNavigate();
    const signinSignout = () => {
        localStorage.clear();
        props.setUserData("");
        props.setUserData({username: "No user"});
    }
     console.log(`checking before the if statment ${props.userData.username}`)
    if(props.userData.username == "No user"){
        return (
        <div className="navbar">
            <div onClick={() => {nav('/home'); props.setUrl("No Video")}}>Home</div>
            <div onClick={() => {nav("/login")}}>Login</div>
        </div>
    )}
    return (
        <div className="navbar">
            <div onClick={() => {nav('/home'); props.setUrl("No Video")}}>Home</div>
            <div onClick={() => {if(props.userData.username != "No user"){nav('/myprofile')}}}>My Profile</div>
            <div >Upload</div>
            <div onClick={() => {signinSignout()}}>Signout</div>
        </div>
    )
}

export default Navbar;