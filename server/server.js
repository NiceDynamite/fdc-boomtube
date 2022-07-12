//Requirements and Imports
require('dotenv').config()
const express = require('express')
const pool = require('./database/connection.js')
const {Pool} = require('pg')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL

//app setup
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////       ROUTES       ///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////// users ///////////////////////////////////////////////////////////////////////////////////

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
        let data = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

///////////////////////////////////////////////////////////////////////////// videos /////////////////////////////////////////////////////////////////////////////

//get/////////////

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

//get one video
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
        res.send(`+1`)
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


///////////////////////////////////////////////////////////////////// favorites //////////////////////////////////////////////////////

//get//////////////////////////////

//gets all favorite videos by user id
app.get('/favorites/:user_id', async (req, res) => {
    try {
        let user_id =  req.params.user_id
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////   app.listen   //////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Connecting to: ${DATABASE_URL}`)
    console.log(`Listening on ${PORT}`)
})