import { useEffect, useState } from 'react';
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import './HomePage.css';
import logo from '../Components/header/boomtubelogo.png';

// const userId = {user_id: 1};



// const userData = async () => {
//     fetch(`http://localhost:5000/users`,{
//              method: 'POST',
//              headers: {
//                  'Content-Type': 'application/json'
//              },
//                  body: JSON.stringify(userId)
//              })
//          .then((response) => response.json())
//          .then((data) => {localStorage.setItem('userData', JSON.stringify(data)); console.log(data)})
//          .then(() => console.log("Mounted user data"))
//          .then(() => usableUserData=JSON.parse(localStorage.userData))
//          .then(() => console.log(usableUserData.username));
// }
// userData();
//console.log(usableUserData);


const HomePage = (props) => {
        // if(props.userData.username != localStorage.userData.username){
        //     props.setUserData(localStorage.userData);
        //     console.log("userData is not same")
        // }else{
        //     console.log("userData is same")
        // }
     console.log(props.videos[0].thumbnail_url)
    return(
        <div id="home-page">
            <Header userData={props.userData} setUserData={props.setUserData}/>
            <div className="container">
                <div>Video 1<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 2<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img>{console.log(`in home ${JSON.stringify(props.userData)}`)}</div>
                <div>Video 3<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 4<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 5<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 6<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 7<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
                <div>Video 8<img src={props.videos[0].thumbnail_url} alt="Video thumbnail" className="HomeLogo"></img></div>
            </div>
            <Footer />
        </div>

    )
    
}

export default HomePage;