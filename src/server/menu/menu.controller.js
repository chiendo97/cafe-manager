const express = require('express')
const router = express.Router()
const menuService = require('./menu.service.js')

router.post('/addMenu', addMenu)
router.get('/getMenu', getMenu)

module.exports = router

function getMenu(req, res, next) {
	menuService.getMenu()
		.then(items => res.json(items))
		.catch(error => next(error))
}

function addMenu(req, res, next) {
	menuService.addMenu(req.body)
		.then( () => res.json() )
		.catch(error => next(error))
}
