const Bookmark = require('../models/Bookmark')

async function findAll(req, res) {
    try {
        const bookmarks = await Bookmark.findAll({ user })
        res.json(bookmarks)

    } catch (error) {
        res.status(500), json(error)
    }
}

async function findOne(params) {
    try {
        const foundProduct = await Bookmark.findOne({ _id: req.params.id, user: req.user._id })

    } catch (error) {

    }
}

async function Update(params) {
    try {

    } catch (error) {

    }
}

async function Create(params) {

    // check for req body 
    console.log('req.body:', req.body)
    try {
        // create a new product
        const newBookmark = new Bookmark.create(req.body)
        // res statuse and json 
        res.status(201).json({ newBookmark })

    } catch (error) {
        // res status and cannot create th e product with details  
        res.status(500).json({ error: 'Failed to create post', details: error.message })
    }
}

async function Delete(params) {
    try {

    } catch (error) {

    }
}

module.exports = { findAll, findOne, Update, Create, Delete }