const express = require('express')
const router = express.Router()
const UserController = require('../controller/userController')
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')

/// making the signToken!


const signToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    )
}

// github OAuth start

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

// github Oauth call back

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', session: false }), (req, res) => {
    const token = signToken(req.user)
    res.redirect(`http://localhost:3000?token=${token}`)
})


router.post('/register', UserController.RegisterPost)
router.post('/login', UserController.LoginPost)



module.exports = router