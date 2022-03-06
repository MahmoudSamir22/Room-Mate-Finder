const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, 'FindRoomMate')
        const user = await userModel.findOne({_id: decodedToken._id, 'tokens.token': token})
        if(!user) throw new Error()
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({apiStatus: false, message: 'Unauthorized', data: e.message})
    }
}

module.exports = auth