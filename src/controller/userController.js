require('dotenv').config()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const verification = require('../utils/utils')
const jwt = require('jsonwebtoken')
// POST
async function RegisterPost(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const newUser = await User.create({ username, email, password });

        // Return created user (without password)
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server error', details: error.message });
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