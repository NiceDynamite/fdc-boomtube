// require('dotenv').config()
const express = require('express')
// const pool = require('./database/connection.js')
const {Pool} = require('pg')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
// const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const pool = new Pool({
    host: 'localhost',
    user: 'alex',
    password: '1313',
    database: 'boomtube_db'

})

app.get('/users', async (req, res)=> {
    try {
        let data = await pool.query(`SELECT * FROM users`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.listen(PORT, ()=>{
    // console.log(`Connecting to: ${DATABASE_URL}`)
    console.log(`Listening on ${PORT}`)
})