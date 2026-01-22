require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URL

async function connectDB() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to the server!")

    } catch (error) {
        console.error("MongoDb connection error:", error)
        process.exit(1)
    }

}

module.exports = connectDB