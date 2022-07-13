
import Footer from '../Components/Footer/Footer';
import Header from '../Components/header/HeaderMain';
import './HomePage.css'

const HomePage = () => {
    return(
        <div id="home-page">
            <Header />
            <div className="container">
                <div>Video 1</div>
                <div>Video 2</div>
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