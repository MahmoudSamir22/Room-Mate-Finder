const userModel = require('../models/user.model')

class User {
    static register = async (req, res) => {
        try {
            const user = await new userModel(req.body)
            await user.save()
            res.status(201).send({
                apiStatus: true,
                message: 'User Registerd Succesfuly',
                data: user
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static readProfile = async (req, res) => {
        try {
            res.status(200).send({
                apiStatus: true,
                message: 'User Data Fetched Succesfuly',
                data: req.user
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static login = async (req, res) => {
        try {
            const user = await userModel.logIn(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                message: 'Succesfully Logged In',
                token,
                data: user
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message,
            })
        }
    }

    static logout = async (req, res) =>{
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Logged out succesfully'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }

    static logoutAll = async (req, res) =>{
        try {
            req.user.tokens =[]
            req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Logged out succesfully from All Devices'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                message: error.message
            })
        }
    }
}

module.exports = User