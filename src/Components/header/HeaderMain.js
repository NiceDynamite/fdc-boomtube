import logo from './boomtubelogo.png';
const Header = () => {
    return (
        <header className="HeaderContainer">
            <img src={logo} alt="boomTubeLogo" className="HeaderLogo"></img>
            <h1>This is a header</h1>
        </header>
    )
}
export default Header