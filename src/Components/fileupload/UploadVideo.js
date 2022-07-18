import React, { useState } from "react";
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

//tells the modal where to attach and render
Modal.setAppElement('#root')
const PORT = process.env.PORT || 5001
const SERVER = process.env.SERVER || 'localhost'

//Component is made to be inserted into the navbar at the location of the upload button.
//On clicking the button/link it pops up a react-modal with a form in it for selecting and
//submitting a video. When the form is submitted it gets a temporary URL from the bucket 
//then uses that to store the video. Finally, it sends a post of the stored location of the 
//video along with the other data like video name and description to the API for storage in 
//the database. This component will only work with two AWS keys that are set in a .env file
//these keys cannot be uploaded to git or Amazon will lock the IAM user with access and the 
//upload component will cease to work.
//This component is dependent on two API routes on the Server:
//'/s3Url' and '/video-upload'
function UploadVideo() {
    //initialize local state
    const [file, setFile] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState('')
    const [fileDescription, setFileDescription] = useState('')
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
        // get secure url from our S3 Bucket
        const { url } = await fetch(`http://${SERVER}:${PORT}/s3Url`).then(res => res.json())
        console.log(url)
        // post the image direclty to the S3 bucket
        await fetch(url, {
            method: "PUT",
            headers: {
            "Content-Type": "video/mp4"
            },
            body: file
        })
        const imageUrl = url.split('?')[0] 
        console.log(`database input, imageUrl: ${imageUrl}`) //clg the url that will be stored in database to access the video later
        //store the url in the Video table using the current logged in user id and other inputs like description etc./route isn't finished
        console.log(fileName)
        await fetch(`http://${SERVER}:${PORT}/video-upload`, {
            method: "POST",
            mode: 'cors',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_id: 1,
                title: fileName,
                video_url: imageUrl, 
                thumbnail_url: 'https://ds956fhn2jvzk.cloudfront.net/boomtubelogo.png',
                description: fileDescription
            })
        }) 
        .catch(console.error())        
    }
    //controlled components state change functions on form data change
    const fileSelected = event => {
		setFile(event.target.files[0])
	}

    const handleFileNameChange = event => {        
        setFileName(event.target.value)
    }
    const handleFileDescriptionChange = event => {        
        setFileDescription(event.target.value)
    }

    return (
        <>
            {/* <button onClick={openModal}>Upload Video</button>    */}
            <Link to="/" onClick={openModal} className="uploadBtn">Upload</Link>
                <Modal contentLabel={"Upload new Avatar JPEG"} 
                shouldFocusAfterRender={true}
                shouldReturnFocusAfterClose={true}
                parentSelector={() => document.body}
                isOpen={modalIsOpen}            
                onRequestClose={closeModal}>  
                <form onSubmit={submit}>
                    <input onChange={fileSelected} type="file" accept="video/mp4" id="file"></input> 
                    <p>File Name: <input type="text" id="fileNameText" onChange={handleFileNameChange} value={fileName}></input></p>
                    <p>Description: <input type="text" id="descriptionText" onChange={handleFileDescriptionChange} value={fileDescription}></input></p>            
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </>
    )  
}

export default UploadVideo