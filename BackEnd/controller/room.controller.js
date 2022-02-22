const roomModel = require('../models/room.model')

class Room {
    static addRoom = async (req, res) => {
        try {
            const roomOb = {
                ...req.body,
                owner: req.user._id,
                gender: req.user.gender
            }
            const room = await new roomModel(roomOb)
            await room.save()
            res.status(201).send({
                apiStatus: true,
                message: 'Room Added Succesfully',
                data: room
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static deleteRoom = async (req, res) => {
        try {
            const room = await roomModel.findOneAndDelete({_id: req.body.id, owner: req.user._id})
            res.status(200).send({
                apiStatus: true,
                message: 'Room Deleted Succesfully',
                data: room
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static readRoom = async (req, res) => {
        try {
            const room = await roomModel.findById(req.body.id)
            if(!room) throw new Error("Not Found")
            res.status(200).send({
                apiStatus: true,
                message: 'Room Fetched Succesfully',
                data: room
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static readAllRooms = async (req, res) => {
        try {
            const rooms = await roomModel.find()
            if(!rooms) throw new Error("Not Found")
            res.status(200).send({
                apiStatus: true,
                message: 'Rooms Fetched Succesfully',
                data: rooms
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static searchRoom = async (req, res) => {
        try {
            let rooms;
            if(req.body.roomPrice){
                let roomPrice = req.body.roomPrice
                delete req.body.roomPrice
                rooms = await roomModel.find(req.body)
                .where('roomPrice').lt(roomPrice +1)
            }else {
                rooms = await roomModel.find(req.body)
            }
            if(rooms.length == 0) throw new Error('No data found')
            res.status(200).send({
                apiStatus: true,
                message: 'Succusfully found Data',
                data: rooms
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }


}

module.exports = Room