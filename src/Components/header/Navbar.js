import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
    const nav = useNavigate();
    const signinSignout = () => {
        localStorage.clear();
        props.setUserData("");
        props.setUserData({username: "No user"});
    }
    // let signinToggle = () => {
    //     props.userData.username == "No user" ? "sign in" : "sign out";
    // }
    return (
        <div className="navbar">
            <a onClick={() => {nav('/home')}}>Home</a>
            <a className="navbarLoggedin" onClick={() => {if(props.userData.username != "No user"){nav('/myprofile')}}}>My Profile</a>
            <a>Upload</a>
            <a className="navbarLoggedin" onClick={() => {signinSignout()}}>signout</a>
            <a className="navbarSignedOut" onClick={() => {nav("/login")}}>Login</a>
        </div>
    )
}

export default Navbar;