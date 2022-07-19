//Requirements and Imports
require('dotenv').config()
const express = require('express')
const pool = require('./database/connection.js')
const { Pool } = require('pg')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5001
const DATABASE_URL = process.env.DATABASE_URL
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const bycrpt = require('bcrypt')
const jwtGenerator = require('./utils/jwtGenerator')
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

// for future functionality should give us the ability to generate a jpeg
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffprobePath = require('@ffprobe-installer/ffprobe').path;

//bucket params setting
const region = process.env.BUCKET_REGION
const bucketName = 's3-tutorial-temporary'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
//bucket connection
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})
//app setup
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')  
    console.log(`imageName: ${imageName}`)
    console.log(`bucketName: ${bucketName}`)
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    //console.log(uploadURL)
    return uploadURL
}

//for future functionality
// ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg.setFfprobePath(ffprobePath);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////       ROUTES       ///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// users ///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////new entries, not sure where to sort them here//////////////////////////////////////////////////////////////////////////////////////

//returns a url from the bucket that can be used for a location to upload the file
app.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})

//change the avatar url for the user who uploads it (under construction)
app.post('/image-upload', async (req, res) => {
    //console.log(req.body.avatar_url)
    //add image_url, title, thumbnail_url, description, UserID(FK) to database
    //for testing purposes we will fill in most of these values with filler data at first
})



//get /////////////////

//get all
app.get('/users', async (req, res) => {
    try {
        let data = await pool.query(`SELECT * FROM users`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// get one user
app.get('/users/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let data = await pool.query(`
            SELECT *
            FROM users
            WHERE user_id = $1
            `, [user_id]
        )
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//get one user and build out info by id
app.post('/users', authenticateToken, async (req, res) => {
    try {
        let user_id = req.body.user_id

        let userInfo = await pool.query(
            `SELECT * 
            FROM users 
            WHERE user_id = $1;
            `, [user_id]
        )
        let userUploadCount = await pool.query(`
            SELECT COUNT (*)
            FROM likes
            WHERE user_id = $1
            `, [user_id]
        )
        let userUploads = await pool.query(`
            SELECT *
            FROM videos
            WHERE user_id = $1
            `, [user_id]
        )
        let userFavorites = await pool.query(`
            SELECT videos.video_id, title, thumbnail_url
            FROM videos, favorites
            WHERE favorites.video_id = videos.video_id
            AND favorites.user_id = $1
            `, [user_id]
        )
        let userHistory = await pool.query(`
            SELECT videos.video_id, title, thumbnail_url
            FROM videos, history
            WHERE history.video_id = videos.video_id
            AND history.user_id = $1
            `, [user_id]
        )
        let user = {
            user_id: user_id,
            username: userInfo.rows[0].username,
            about: userInfo.rows[0].about,
            avatar_url: userInfo.rows[0].avatar_url,
            darkmode: userInfo.rows[0].darkmode,
            uploads_count: userUploadCount.rows[0].count,
            uploads: userUploads.rows,
            favorites: userFavorites.rows,
            history: userHistory.rows
        }
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//patch////////////////////////////

//patch one user by user id
app.patch('/users/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let username = req.body.username
        let about = req.body.about
        let avatar_url = req.body.avatar_url
        await pool.query(`
            UPDATE users
            SET username = $1, about = $2, avatar_url = $3
            WHERE user_id = $4
            `, [username, about, avatar_url, user_id]
        )
        res.json(`Updated`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//delete///////////////////////////

//deletes one user by user id
app.delete('/users/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        await pool.query(`
        DELETE FROM users
        WHERE user_id = $1
        `, [user_id]
    )
    res.json(`Deleted`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

///////////////////////////////////////////////////////////////////////////// videos /////////////////////////////////////////////////////////////////////////////

//get////////////////////////

//get all videos
app.get('/videos', async (req, res) => {
    try {
        let data = await pool.query(`SELECT * FROM videos`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//get one video by id
app.get('/videos/:video_id', async (req, res) => {
    try {
        let video_id = req.params.video_id
        let data = await pool.query(`SELECT * FROM videos WHERE video_id = $1`, [video_id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//get one video by title---using a post request to handle body
app.post('/videos', async (req, res) => {
    try {
        let title = req.body.title
        let data = await pool.query(`
            SELECT * FROM videos
            WHERE title = $1
            `, [title]
        )
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})


//get all from one user
app.get('/videos-from-user/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let data = await pool.query(`SELECT * FROM videos WHERE user_id = $1`, [user_id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// get an array of random videos
app.get('/video-array/:length', async (req, res) => {
    try {
        let length = req.params.length
        let data = await pool.query(`SELECT * FROM videos ORDER BY random() LIMIT $1`, [length])
        res.send(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})
//post/////////////////////////////
//Inserts all pertinent information into video table for a video that has just been uploaded to the bucket
//Called by the UploadVideo component on the Navbar component, in the header component. 
//future functionality may include a call to create a thumbnail of the video and storing it during this call to 
//the database. 
app.post('/video-upload', async (req, res) => {
    try {//for future functionality\/\/\/\/
//     const url = await generateUploadURL()
//     //EXTRACT VIDEO DETAILS USING ffprobe (I am using multer)
//     ffmpeg.ffprobe(req.body.video_url, (err, data)=>{
//     // take out height and width and decrease it (depending on your requirement)
//     ffmpeg(req.body.video_url)
//     .screenshots({
//     timestamps: ["00:01"],
//     filename: `${url}`,
//     folder: "./thumbs",
//     count: 1,
//     size: `${width}x${height}`,//getting this from ffprobe
//     }).on("end", ()=> {
//          //upload file in 'to/wherever/you/want'(thumbnail) to s3
//          //upload the video as well to s3
//     })
// })//end future functionaility /\/\/\/\
        let user_id = req.body.user_id        
        let title =  req.body.title
        let video_url = req.body.video_url
        let thumbnail_url = req.body.thumbnail_url
        let description = req.body.description
        await pool.query(`
            INSERT INTO videos (user_id, title, video_url, thumbnail_url, description) VALUES ($1, $2, $3, $4, $5)
            `, [user_id, title, video_url, thumbnail_url, description]
        )
        res.json('Video Uploaded')
    } catch (error) {
        console.log(error.message)
        res.send(error.messageq)
    }        
})

//patch///////////////////////////

//patch one video by video id
app.patch('/videos/:video_id', async (req, res) => {
    try {
        let video_id = req.params.video_id
        let title =  req.body.title
        let thumbnail_url = req.body.thumbnail_url
        let description = req.body.description
        await pool.query(`
            UPDATE videos
            SET title = $1, thumbnail_url = $2, description = $3
            WHERE video_id = $4
            `, [title, thumbnail_url, description, video_id]
        )
        res.json('Video Updated')
    } catch (error) {
        console.log(error.message)
        res.send(error.messageq)
    }
})

////////////////////////////////////////////////////////////////////////// comments ///////////////////////////////////////////////////////////////////////////////

//get/////////////////////////////

//get all by video
app.get('/comments/:video_id', async (req, res) => {
    try {
        let video_id = req.params.video_id
        let data = await pool.query(`SELECT * FROM comments WHERE video_id = $1`, [video_id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//post ////////////////////////////

//post one comment by user/video id
app.post('/comments/:user_id/:video_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let video_id = req.params.video_id
        let comment_text = req.body.comment_text
        await pool.query(`
            INSERT INTO comments (user_id, video_id, comment_text)
            VALUES ($1, $2, $3)
            `, [user_id, video_id, comment_text]
        )
        res.send(`Comment Posted`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//patch//////////////////////////////

//patch one comment by comment id
app.patch('/comments/:comment_id', async (req, res) => {
    try {
        let comment_id = req.params.comment_id
        let comment_text = req.body.comment_text
        await pool.query(`
            UPDATE comments
            SET comment_text = $1
            WHERE comment_id = $2
            `, [comment_text, comment_id]
        )
        res.json(`Edited`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//delete////////////////////////////

//deletes one from comment by comment id
app.delete('/comments/:comment_id', async (req, res) => {
    try {
        let comment_id = req.params.comment_id
        await pool.query(`
            DELETE FROM comments
            WHERE comment_id = $1
            `, [comment_id]
        )
        res.json(`Deleted`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

/////////////////////////////////////////////////////////////////////// likes /////////////////////////////////////////////////////////

//get////////////////////////////////

//get count of likes by video id
app.get('/likes/:video_id', async (req, res) => {
    try {
        let video_id = req.params.video_id
        let data = await pool.query(`SELECT COUNT (*) FROM likes WHERE video_id = $1`, [video_id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//post//////////////////////////////

//post one like by user/video id
app.post('/likes/:user_id/:video_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let video_id = req.params.video_id
        await pool.query(`
            INSERT INTO likes (user_id, video_id)
            VALUES ($1, $2)
            `, [user_id, video_id]
        )
        res.json(`+1`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//delete////////////////////////////

//deletes one like by user id and video id
app.delete('/likes/:user_id/:video_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let video_id = req.params.video_id
        await pool.query(`
            DELETE FROM likes
            WHERE user_id = $1
            AND video_id = $2
            `, [user_id, video_id]
        )
        res.json(`-1`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

/////////////////////////////////////////////////////////////////////// history ///////////////////////////////////////////////////////

//get/////////////////////////////////

//gets last 12 videos from user history in reverse cronological order
app.get('/history/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let data = await pool.query(`
            SELECT video_url
            FROM videos, history
            WHERE history.video_id = videos.video_id
            AND history.user_id = $1
            ORDER BY history.history_id DESC
            LIMIT 12
            `, [user_id]
        )
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//post///////////////////////////////////

//post one video to history by user/video id
app.post('/history/:user_id/:video_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let video_id = req.params.video_id
        await pool.query(`
            INSERT INTO history (user_id, video_id)
            VALUES ($1, $2)
            `, [user_id, video_id]
        )
        res.send(`History Updated`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//delete/////////////////////////////////

//deletes one video from history by history id
app.delete('/history/:history_id', async (req, res) => {
    try {
        let history_id = req.params.history_id
        await pool.query(`
            DELETE FROM history
            WHERE history_id = $1
            `, [history_id]
        )
        res.json(`Deleted`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})


///////////////////////////////////////////////////////////////////// favorites //////////////////////////////////////////////////////

//get//////////////////////////////

//gets all favorite videos by user id
app.get('/favorites/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let data = await pool.query(`
            SELECT video_url
            FROM videos, favorites
            WHERE favorites.video_id = videos.video_id
            AND favorites.user_id = $1
            `, [user_id]
        )
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//post//////////////////////////////

//posts one favorite to user by user/video id
app.post('/favorites/:user_id/:video_id', async (req, res) => {
    try {
        let user_id = req.params.user_id
        let video_id = req.params.video_id
        await pool.query(`
            INSERT INTO favorites (user_id, video_id)
            VALUES ($1, $2)
            `, [user_id, video_id]
        )
        res.send(`Added to Favorites`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//delete/////////////////////////

//delete from favorites by favorite id
app.delete('/favorites/:favorite_id', async (req, res) => {
    try {
        let favorite_id = req.params.favorite_id
        await pool.query(`
            DELETE FROM favorites
            WHERE favorite_id = $1
            `, [favorite_id]
        )
        res.json(`Deleted`)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////   app.listen   //////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Connecting to: ${DATABASE_URL}`)
    console.log(`Listening on ${PORT}`)
})

app.post('/register', [

    check('username', 'Please enter a username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    check('password', "Password must be at least 5 characters long")
        .isLength({ min: 5 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                errors: errors.array(),
                status: 400
            })
        }

        const { username, email, password } = req.body

        const user = await pool.query('SELECT * FROM users WHERE email = $1;', [email])

        if (user.rows.length !== 0) {
            return res.status(401).send({ msg: 'email is already in use' })
        }

        const bycrptPassword = await bycrpt.hash(password, 10)

        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;', [username, email, bycrptPassword])

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ msg: 'Account Created Successfully', id: newUser.rows[0].user_id, token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ msg: 'Server is having troubles' })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username])

        if (user.rows.length < 1) {
            return res.status(404).send({ msg: 'User Not Found' })
        }

        const validPassword = await bycrpt.compare(password, user.rows[0].password)

        if (!validPassword) {
            return res.status(401).send({ msg: 'Password is invalid' })
        }

        const token = jwtGenerator(user.rows[0].user_id)

        res.json({ msg: 'login Successful', id: user.rows[0].user_id, token })

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ msg: 'Server is having troubles' })
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        next()
    })
}

