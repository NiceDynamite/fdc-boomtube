const Navbar = () => {
    return (
        <div className="navbar">
            <a className="active">Home</a>
            <a className="navbarLoggedin">My Profile</a>
            <a>Upload</a>
            <a className="navbarLoggedin">Sign Out</a>
        </div>
    )
}

export default Navbar;