import {Link} from 'react-router-dom'
import UploadVideo from '../fileupload/UploadVideo';

const Navbar = () => {

    const handleClick = (e) => {
        const home = document.getElementsByClassName('homeBtn')
        const signUp = document.getElementsByClassName('signupBtn')
        const upload = document.getElementsByClassName('uploadBtn')
        const signOut = document.getElementsByClassName('signOutBtn')
    }

    return (
        <div className="navbar">
            <Link to="/" onClick={handleClick} className="homeBtn">Home</Link>
            <Link to='/myprofile' onClick={handleClick} className="signupBtn">My Profile</Link>
            <UploadVideo />            
            <Link to="/login" onClick={handleClick} className="signOutBtn">Sign Out</Link>
        </div>
    )
}

export default Navbar;