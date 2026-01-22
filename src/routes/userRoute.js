const express = require('express')
const router = express.Router()
const UserController = require('../controller/userController')
const githubController = require('../controller/githubControllers')
const passport = require('../config/passport')

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', session: false }), (req, res) => {
    const token = signToken(req.user)
    res.redirect(`http://localhost:300?token=${token}`)
})

router.post('/register', UserController.RegisterPost)
router.post('/login', UserController.LoginPost)



module.exports = router