import '../../Pages/MyProfile.css'
import ProfileVideo from "./ProfileVideo"

const Favorites = (props) => {
    return (
        <div>
            <span id="favorite-videos">
                <h3>Your favorite videos:</h3>
                {props.userData.favorites.map((elem) => {
               return  <ProfileVideo elem={elem} />
            })}
            </span>
        </div>
    )
}

export default Favorites;