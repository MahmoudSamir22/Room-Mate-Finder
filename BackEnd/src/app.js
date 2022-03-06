require('dotenv').config()
require('../db/dbConnection')
const express = require('express')
const path = require('path')

const userRouter = require('../routes/user.routes')
const roomRouter = require('../routes/room.routes')


const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(userRouter)
app.use(roomRouter)



module.exports = app