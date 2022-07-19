import logo from './boomtubelogo.png';
import Navbar from './Navbar';
const Header = () => {
    return (
        <header className="HeaderContainer">
            <img src={logo} alt="boomTubeLogo" className="HeaderLogo"></img>
            <Navbar />
        </header>
    )
}
export default Header