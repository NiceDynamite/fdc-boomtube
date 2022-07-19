import { PropaneSharp } from "@mui/icons-material";
import React, { useState } from "react";
import Modal from 'react-modal';

//tells the modal where to attach and render
Modal.setAppElement('#root')
const PORT = process.env.PORT || 5001
const SERVER = process.env.SERVER || 'localhost'
function UploadAvatar(props) {    
    const [file, setFile] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState(props.userData.username)
    const [about, setAbout] = useState(props.userData.about)
    //displays modal with file upload form
    function openModal() {
        setIsOpen(true);
    }
    //closes the modal and sets focus back to previous element
    function closeModal() {
        setIsOpen(false);
    }
    let updateObj = {
        username: props.userData.username,
        about: props.userData.about,
        avatar_url: props.userData.avatar_url
    }
    const submit = async event => {
        event.preventDefault()
        updateObj.username = userName;
        updateObj.about = about;        
        closeModal()
        // get secure url from our server
        const { url } = await fetch(`http://${SERVER}:${PORT}/s3Url`).then(res => res.json())
        console.log(url)
        // post the image direclty to the s3 bucket
        await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "image/jpeg"
            },
            body: file
        })
        const imageUrl = url.split('?')[0] 
        props.setUserData({
            user_id: props.userData.user_id, 
            username: userName, 
            about: about, 
            avatar_url: imageUrl, 
            darkmode: props.userData.darkmode, 
            uploads_count: props.userData.uploads_count, 
            uploads: props.userData.uploads, 
            favorites: props.userData.favorites, 
            history: props.userData.history
        })
        
        console.log(imageUrl)
        console.log(props.userData) //clg the url that will be stored in database to access the image later
        //store the url in the users table using the current logged in user id/route isn't finished
        await fetch(`http://${SERVER}:${PORT}/users/${props.userData.user_id}`, {
            method: "PATCH",
            mode: 'cors',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                about: about,
                avatar_url: imageUrl})
        }) 
        .catch(console.error())        
    }

    const fileSelected = event => {
        const file = event.target.files[0]
		setFile(file)
	}
    
    const handleUserNameChange = event => {
        setUserName(event.target.value);

    }
    const handleAboutChange = event => {
        setAbout(event.target.value);
    }
    return (
        <>   
            <div onClick={openModal}>EditProfile</div>   
            <Modal contentLabel={"Upload new Avatar JPEG"} 
            className="videoModal"
            overlayClassName="videoOverlay"
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            parentSelector={() => document.body}
            isOpen={modalIsOpen}            
            onRequestClose={closeModal}>     
                <form onSubmit={submit}>
                    <input onChange={fileSelected} type="file" accept="image/*"></input>
                    <p>User Name: <input type="text" id="userName" onChange={handleUserNameChange} value={userName}></input></p>
                    <p>About: <input type="textArea" id="about" onChange={handleAboutChange} value={about}></input></p>               
                    <button type="submit">Submit</button>
                </form>        
            </Modal>
        </>  
    )  
}

export default UploadAvatar
