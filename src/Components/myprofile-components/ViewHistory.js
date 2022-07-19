import '../../Css/MyProfile.css'

const ViewHistory = () => {
    return (
        <div>
            {/* <h3>Your recent history:</h3> */}
            <span id="view-history">
                <h3>Your recent history:</h3>
                <div className='myprofilevideo'>Viewed video 1</div>
                <div className='myprofilevideo'>Viewed video 2</div>
                <div className='myprofilevideo'>Viewed video 3</div>
            </span>
        </div>
    )
}

export default ViewHistory;