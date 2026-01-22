const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Enter an email"],
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Enter password"],
    },
    githubId: {
        type: String,
        index: true
    },
    timestamps: true
})
// ensure at least one auth method 
userSchema.pre('validate', function (next) {
    if (!this.password && !this.githubId) {
        next(new Error(' User must have a passwor or gitHub ID'))

    }

    next()
})
// hash the password 

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})


userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
const User = model('User', userSchema)

module.exports = User 