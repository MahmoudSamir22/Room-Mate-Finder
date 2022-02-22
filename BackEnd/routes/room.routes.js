const router = require('express').Router()
const roomController = require('../controller/room.controller')
const auth = require('../middleware/auth')

router.post('/readRoom', roomController.readRoom)

router.get('/readAllRooms', roomController.readAllRooms)

router.post('/addRoom', auth, roomController.addRoom)

router.delete('/deleteRoom', auth, roomController.deleteRoom)

router.post('/searchRoom', roomController.searchRoom)

module.exports = router