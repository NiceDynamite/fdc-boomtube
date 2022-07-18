import './footer.css';
// import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        
        <footer>
            <p id="createdBy">Created by:</p>
            <div id="profiles">
                <div id="price-div">
                    <p>Christopher Price</p>
                    <a href="https://www.linkedin.com/in/karmacausey/" target="blank"><LinkedInIcon /></a>
                    <a href="https://github.com/karmacausey" target="blank"><GitHubIcon /></a>
                </div>
                <div id="warren-div">
                    <p>Aaron Warren</p>
                    <a href="https://www.linkedin.com/in/aaron-m-warren/" target="blank"><LinkedInIcon /></a>
                    <a href="https://github.com/AMWARREN21" target="blank"><GitHubIcon /></a>
                </div>
                <div id="nichols-div">
                    <p>George Nichols</p>
                    <a href="https://www.linkedin.com/in/georgehniii/" target="blank"><LinkedInIcon /></a>
                    <a href="https://github.com/georgehniii" target="blank"><GitHubIcon /></a>
                </div>
                <div id="miller-div">
                    <p>Thomas Miller</p>
                    <a href="https://www.linkedin.com/in/thomas-miller-fse/" target="blank"><LinkedInIcon /></a>
                    <a href="https://github.com/T-Miller94" target="blank"><GitHubIcon /></a>
                </div>
                <div id="odell-div">
                    <p>Wayne Odell</p>
                    <a href="https://www.linkedin.com/in/wayne-odell/" target="blank"><LinkedInIcon /></a>
                    <a href="https://github.com/treyodell8" target="blank"><GitHubIcon /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;