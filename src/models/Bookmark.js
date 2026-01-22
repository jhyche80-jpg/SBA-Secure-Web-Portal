const { Schema, model } = require("mongoose")


const bookmarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    timestamps: true


})
const Bookmark = model('Bookmark', bookmarkSchema)

module.exports = Bookmark