
import Footer from '../Components/footer/Footer';
import Header from '../Components/header/HeaderMain';
import '../Css/Homepage.css'
const userName = () => {
 localStorage.setItem('userName', 'bob');
}
const HomePage = () => {
    return(
        <div id="home-page">
            <Header />
            <div className="container">
                <div>Video 1{userName()}</div>
                <div>Video 2{` ${localStorage.userName}`}</div>
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