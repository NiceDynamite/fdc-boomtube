
import {Link} from 'react-router-dom'

import UploadVideo from '../fileupload/UploadVideo';


const Navbar = () => {

    const handleClick = (e) => {
        const home = document.getElementsByClassName('homeBtn')
        const signUp = document.getElementsByClassName('signupBtn')
        const upload = document.getElementsByClassName('uploadBtn')
        const signOut = document.getElementsByClassName('signOutBtn')
        if (home.classList.contains('active')) {
            home.classList.remove('active')
        }
        if (signUp.classList.contains('active')) {
            signUp.classList.remove('active')
        }
        if (upload.classList.contains('active')) {
            upload.classList.remove('active')
        }
        if (signOut.classList.contains('active')) {
            signOut.classList.remove('active')
        }
        e.target.classList.add('active')
    }

    return (
        <div className="navbar">

            <Link to="/home" onClick={handleClick} className="homeBtn active">Home</Link>
            <Link to='/myprofile' onClick={handleClick} className="signupBtn">My Profile</Link>
            <Link to='/upload' onClick={handleClick} className="uploadBtn">Upload</Link>
            <Link to="/login" onClick={handleClick} className="signOutBtn">Sign Out</Link>
        </div>
    )
}

export default Navbar;