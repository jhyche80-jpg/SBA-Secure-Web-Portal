const express = require('express')
const router = express.Router()
const bookmarkController = require('../controller/bookmarkController')
const authMiddleware = require('../utils/auth')

router.use(authMiddleware)
// find all
router.get('/', bookmarkController.findAll)
// find one 
router.get('/:id', bookmarkController.findOne)
// update a product
router.put('/:id', bookmarkController.Update)
// create a product 
router.post('/', bookmarkController.Create)
// delete a product 
router.delete('/:id', bookmarkController.Delete)

module.exports = router