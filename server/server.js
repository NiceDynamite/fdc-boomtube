require('dotenv').config()
const express = require('express')
const pool = require('./database/connection.js')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())
app.use(express.json())
app.use(express.static('public'))



app.listen(PORT, ()=>{
    console.log(`Connecting to: ${DATABASE_URL}`)
    console.log(`Listing on ${PORT}`)
})