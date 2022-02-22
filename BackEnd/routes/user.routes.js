const router = require('express').Router()
const userController = require('../controller/user.controller')
const auth = require('../middleware/auth')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/logout', auth,  userController.logout)

router.post('/logoutAll', auth, userController.logoutAll)

router.get('/readProfile', auth, userController.readProfile)

module.exports = router
