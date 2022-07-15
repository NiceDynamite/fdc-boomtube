const Navbar = () => {
    return (
        <div className="navbar">
            <a className="active">Home</a>
            <a>My Profile</a>
            <a>Upload</a>
            <a onClick={() => {localStorage.clear();}}>Sign Out</a>
        </div>
    )
}

export default Navbar;