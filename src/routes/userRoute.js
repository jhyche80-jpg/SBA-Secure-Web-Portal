const express = require('express')
const router = express.Router()
const UserController = require('../controller/userController')

router.post('/register', UserController.RegisterPost)
router.post('/login', UserController.LoginPost)



module.exports = router