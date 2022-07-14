import React, { useState } from "react";
import Modal from 'react-modal';

//tells the modal where to attach and render
Modal.setAppElement('#root')
const PORT = process.env.PORT || 5000
const SERVER = process.env.SERVER || 'localhost'
function UploadAvatar() {    
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

    const submit = async event => {
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
        console.log(imageUrl) //clg the url that will be stored in database to access the image later
        //store the url in the users table using the current logged in user id/route isn't finished
        await fetch(`http://${SERVER}:${PORT}/image-upload`, {
            method: "POST",
            mode: 'cors',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar_url: `${imageUrl}` })
        }) 
        .catch(console.error())        
    }

    const fileSelected = event => {
        const file = event.target.files[0]
		setFile(file)
	}

    return (
        <div className="uploadAvatar">        
            <button onClick={openModal}>Change Avatar</button>   
            <Modal contentLabel={"Upload new Avatar JPEG"} 
            shouldFocusAfterRender={true}
            shouldReturnFocusAfterClose={true}
            parentSelector={() => document.body}
            isOpen={modalIsOpen}            
            onRequestClose={closeModal}>     
                <form onSubmit={submit}>
                    <input onChange={fileSelected} type="file" accept="image/*"></input>                
                    <button type="submit">Submit</button>
                </form>        
            </Modal>
        </div>
    )  
}

export default UploadAvatar
