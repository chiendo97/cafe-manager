const express = require('express')
const router = express.Router()
const storageService = require('./storage.service.js')

router.post('/addItem', addItem)
router.get('/getStorage', getStorage)

module.exports = router

function getStorage(req, res, next) {
	storageService.getStorage()
		.then(items => res.json(items))
		.catch(error => next(error))
}

function addItem(req, res, next) {
	storageService.addItem(req.body)
		.then(item => res.json(item))
		.catch(error => next(error))
}
