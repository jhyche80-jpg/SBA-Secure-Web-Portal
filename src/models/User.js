const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { // renamed from 'name' to match controller
        type: String,
        required: [true, "Please enter a username"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter an email"],
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
    },
    githubId: {
        type: String,
        index: true
    },
}, {
    timestamps: true
});

// Ensure at least one auth method
userSchema.pre('validate', function () {
    if (!this.password && !this.githubId) {
        return console.error('User must have a password or GitHub ID');
    }

});

// Hash password before saving
userSchema.pre('save', async function () {
    try {
        this.password = await bcrypt.hash(this.password, 10);

    } catch (err) {
        console.error(error)
    }
});

// Compare password method
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;