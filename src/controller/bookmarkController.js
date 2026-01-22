const Bookmark = require('../models/Bookmark')

async function findAll(req, res) {
    try {
        const bookmarks = await Bookmark.find({ user: req.user._id })
        res.json(bookmarks)

    } catch (error) {
        res.status(500).json({ error: ' error fetch the product', details: error.message })
    }
}

async function findOne(req, res) {
    try {
        const foundProduct = await Bookmark.findOne({ _id: req.params.id, user: req.user._id })
        if (!foundProduct) {
            return res.status(404).json({ message: ' Bookmark Note found!' })
        }
        res.status(201).json(foundProduct)

    } catch (error) {
        res.status(500).json({ error: 'error finding the product', details: error.message })

    }
}



async function Create(req, res) {

    // check for req body 
    console.log('req.body:', req.body)

    try {
        req.body.user = req.user._id

        // create a new product
        const newBookmark = await Bookmark.create(req.body)
        // res statuse and json 
        res.status(201).json(newBookmark)

    } catch (error) {
        // res status and cannot create th e product with details  
        res.status(500).json({ error: 'Failed to create post', details: error.message })
    }
}

async function Delete(req, res) {
    try {
        const bookmark = await Bookmark.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })
        if (!bookmark) {
            return res.status(404).json({ message: "Unauthorized access or product does not exist" })
        }
        res.json(bookmark)

    } catch (error) {
        res.status(500).json(error)
    }
}


async function Update(req, res) {
    try {
        const bookmark = await Bookmark.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req, body, { new: true, runValidators: true })
        if (!bookmark) {
            return res.status(404).json({ message: " Bookmark is not found or you are not authorized to do this" })
        }
        res.json(bookmark)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { findAll, findOne, Update, Create, Delete }