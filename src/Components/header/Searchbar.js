
import SearchIcon from '@mui/icons-material/Search';
const Searchbar = () => {
    return (
        <form id="input-form">
            <input type="text" className="input"></input>
            <div id="submitBtn" type="button">
                <SearchIcon sx={{fontSize:20}}/>
            </div>
            
        </form>
    )
} //<input id="submitBtn" type="button" value="Search"/>

export default Searchbar;