const express = require('express')
const router = express.Router()
const bookmarkController = require('../controller/bookmarkController')


// find all
router.get('/', bookmarkController.findAll)
// find one 
router.get('/:id', bookmarkController.findOne)
// update a product
router.get('/:id', bookmarkController.Update)
// create a product 
router.post('/', bookmarkController.Create)
// delete a product 
router.delete('/:id', bookmarkController.Delete)
