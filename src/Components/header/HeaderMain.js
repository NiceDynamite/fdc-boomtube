import { PropaneSharp } from '@mui/icons-material';
import logo from './boomtubelogo.png';
import Navbar from './Navbar';
import Searchbar from './Searchbar';

const Header = (props) => {
    let avatar = logo;
    if(props.userData.avatar_url){
        avatar = props.userData.avatar_url
    }
    return (
        <header className="HeaderContainer">
            <img src={logo} alt="boomTubeLogo" className="HeaderLogo"></img>
            <div className="navbarContainer">
                <Navbar userData={props.userData} setUrl={props.setUrl} setUserData={props.setUserData}/>
                <Searchbar />
            </div>
            <div className="HeaderAvatarContainer">
                <img src={avatar} alt="boomTubeLogo" className="HeaderLogo"></img>
                <div>{props.userData.username}</div>
            </div>
        </header>
    )
}
export default Header