import { PropaneSharp } from '@mui/icons-material';
import logo from './logo.png';
import boomtubelogo from "./boomtubelogo.png"
import Navbar from './Navbar';
import Searchbar from './Searchbar';

const Header = (props) => {
    let avatar = logo;
    if(props.userData.username != "No user"){
        if(props.userData.avatar_url != null){
             avatar = props.userData.avatar_url
        }
       
    
        return (
            <header className="HeaderContainer">
                <img src={boomtubelogo} alt="boomTubeLogo" className="HeaderLogo"></img>
                <div className="navbarContainer">
                    <Navbar userData={props.userData} setUrl={props.setUrl} setUserData={props.setUserData}/>
                    <Searchbar />
                </div>
                <div className="HeaderAvatarContainer">
                    <img src={avatar} alt="userAvatar" className="avatar"></img>
                    <div>{props.userData.username}</div>
                </div>
            </header>
        )
    }
    return (
        <header className="HeaderContainer">
            <img src={logo} alt="boomTubeLogo" className="HeaderLogo"></img>
            <div className="navbarContainer">
                <Navbar userData={props.userData} setUrl={props.setUrl} setUserData={props.setUserData}/>
                <Searchbar />
            </div>
            <div className="HeaderAvatarContainer">
            </div>
        </header>
    )
}
export default Header