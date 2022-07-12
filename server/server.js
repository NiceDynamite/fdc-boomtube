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

// get one
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

//get all
app.get('/videos', async (req, res) => {
    try {
        let data = await pool.query(`SELECT * FROM videos`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

//get one
app.get('/videos/:video_id', async (req, res) => {
    try {
        let video_id = req.params.video_id
        let data =  await pool.query(`SELECT * FROM videos WHERE video_id = $1`, [video_id])
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


/////////////////////////////////////////////////////////////////////// likes /////////////////////////////////////////////////////////

//get////////////////////////////////

//get count of likes by video
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

////////////////////////////////////////////////////////////////////////   app.listen   ///////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Connecting to: ${DATABASE_URL}`)
    console.log(`Listening on ${PORT}`)
})