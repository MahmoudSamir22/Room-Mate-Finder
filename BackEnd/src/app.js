require('dotenv').config()
require('../db/dbConnection')
const express = require('express')

const userRouter = require('../routes/user.routes')
const roomRouter = require('../routes/room.routes')


const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(roomRouter)

module.exports = app