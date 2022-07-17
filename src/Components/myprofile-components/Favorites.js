import '../../Pages/MyProfile.css'

const Favorites = () => {
    return (
        <div>
            {/* <h3>Favorites:</h3> */}
            <span id="favorite-videos">
                <h3>Your favorite videos:</h3>
                <div className='myprofilevideo'>Favorite Video 1</div>
                <div className='myprofilevideo'>Favorite Video 2</div>
                <div className='myprofilevideo'>Favorite Video 3</div>
            </span>
        </div>
    )
}

export default Favorites;