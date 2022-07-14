import { Component } from 'react';
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import './Homepage.css';

const userId = {user_id: 1};
let usableUserData={};
const userData = async () => {
    fetch(`http://localhost:5000/users`,{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
                 body: JSON.stringify(userId)
             })
         .then((response) => response.json())
         .then((data) => {localStorage.setItem('userData', JSON.stringify(data)); console.log(data)})
         .then(() => console.log("Mounted user data"))
         .then(() => usableUserData=JSON.parse(localStorage.userData))
         .then(() => console.log(usableUserData.username));
}
userData();

const HomePage = () => {
    return(
        <div id="home-page">
            <Header />
            <div className="container">
                <div>Video 1</div>
                <div>Video 2{console.log(usableUserData.username)}</div>
                <div>Video 3</div>
                <div>Video 4</div>
                <div>Video 5</div>
                <div>Video 6</div>
                <div>Video 7</div>
                <div>Video 8</div>
            </div>
            <Footer />
        </div>

    )
    
}

export default HomePage;