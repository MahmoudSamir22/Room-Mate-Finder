const router = require('express').Router()
const roomController = require('../controller/room.controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')
const path = require('path')

router.post('/readRoom', roomController.readRoom)

router.get('/readAllRooms', roomController.readAllRooms)

router.post('/addRoom', auth, upload.array('img', 5) ,roomController.addRoom)

router.delete('/deleteRoom', auth, roomController.deleteRoom)

router.post('/searchRoom', roomController.searchRoom)

router.post('/fileUpload', auth, upload.single('avatar'), (req, res) => {
    try {
        image = 'uploads/' + req.file.filename
        console.log('postman body: ', req.file);
        res.send({image}) 
    } catch (e) {
        res.send({e: e.message})
    }
})

router.get('/uploads', (req, res) => {
    try {
        console.log(path.__dirname);
        res.send('../uploads/61c5c2f02d293d7deb48b4d1/img-1646182726429.jpg')
    } catch (e) {
        
    }
})

module.exports = router