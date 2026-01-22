require('dotenv').config()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const verification = require('../utils/utils')
const jwt = require('jsonwebtoken')
// POST
async function RegisterPost(req, res) {
    console.log("Body:", req.body)
    try {
        const { email, name, password } = req.body
        const verify = name && email && password
        verification(verify, res, 'Please fill out all fields')
        const correctEmail = (/.+@.+\..+/).test(email)
        verification(correctEmail, res, "Invalid Email")
        const existingUser = await User.findOne({ email })
        verification(!existingUser, res, 'Email in use')
        const newUser = User.create({ name, email, password })

        console.log(newUser)
        res.status(201).json(newUser)

    } catch (error) {
        console.error("error creating user information", error)
        res.status(400).json({ error: "failed to create Post!", details: error.message })
    }


}
// POST

async function LoginPost(req, res) {
    const secret = process.env.JWT_SECRET
    const expiration = '2h'
    try {
        const { email, password } = req.body
        const verify = (email && password)
        const message = "incorrect infromation entered!"
        verification(verify, res, message)
        const user = await User.findOne({ email })
        const correctPassword = await user.isCorrectPassword(password)
        verification(correctPassword, res, message)
        const payload = {
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        }
        const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
        res.json({ token, user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'server error' })
    }
}


module.exports = { RegisterPost, LoginPost }