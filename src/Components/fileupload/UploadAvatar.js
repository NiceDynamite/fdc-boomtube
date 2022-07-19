import { PropaneSharp } from "@mui/icons-material";
import React, { useState } from "react";
import Modal from 'react-modal';

//tells the modal where to attach and render
Modal.setAppElement('#root')
const PORT = process.env.PORT || 5000
const SERVER = process.env.SERVER || 'localhost'
function UploadAvatar(props) {    
    const [file, setFile] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
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
        updateObj.username = nameReplace;
        updateObj.about = aboutReplace;
        event.preventDefault()
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
        props.setUserData({user_id: props.userData.user_id, username: updateObj.username, about: updateObj.about, avatar_url: imageUrl, darkmode: props.userData.darkmode, uploads_count: props.userData.uploads_count, uploads: props.userData.uploads, favorites: props.userData.favorites, history: props.userData.history})
        
        console.log(imageUrl)
        console.log(props.userData) //clg the url that will be stored in database to access the image later
        //store the url in the users table using the current logged in user id/route isn't finished
        await fetch(`http://${SERVER}:${PORT}/users/${props.userData.user_id}`, {
            method: "POST",
            mode: 'cors',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.userData.username,
                about: props.userData.about,
                avatar_url: props.userData.avatar_url})
        }) 
        .catch(console.error())        
    }

    const fileSelected = event => {
        const file = event.target.files[0]
		setFile(file)
	}
    let nameReplace = "";
    let aboutReplace = "";
    const handleUserNameChange = event => {
        nameReplace=event.target.value;
    }
    const handleAboutChange = event => {
        aboutReplace=event.target.value;
    }
    return (
        <>   
            <div onClick={openModal}>EditProfile</div>   
            <Modal contentLabel={"Upload new Avatar JPEG"} 
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            parentSelector={() => document.body}
            isOpen={modalIsOpen}            
            onRequestClose={closeModal}>     
                <form onSubmit={submit}>
                    <input onChange={fileSelected} type="file" accept="image/*"></input>
                    <p>User Name: <input type="text" id="fileNameText" onChange={handleUserNameChange} value={props.username}></input></p>
                    <p>About: <input type="textArea" id="fileNameText" onChange={handleAboutChange} value={props.about}></input></p>               
                    <button type="submit">Submit</button>
                </form>        
            </Modal>
        </>  
    )  
}

export default UploadAvatar
