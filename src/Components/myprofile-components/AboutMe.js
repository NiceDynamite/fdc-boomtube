import '../../Pages/MyProfile.css'

const AboutMe = (props) => {
    return (
        <span id="aboutMeSection">
            <h3>About Me:</h3>
            <p>{props.userData.about}</p>
        </span>
    )
}

export default AboutMe