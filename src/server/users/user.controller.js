const express = require('express')
const router = express.Router()
const userService = require('./user.service.js')

router.post('/authenticate', authenticate)
router.get('/getAll', getAll)
router.post('/addUser', addUser)

module.exports = router

function authenticate(req, res, next) {
	userService.authenticate(req.body)
		.then(user => user ? res.json(user) : res.status(400).json( { message: 'Username and password is incorrect'} ))
		.catch(error => {
			next(error)
		})
}

function getAll(req, res, next) {
	userService.getAll()
		.then(users => {
			res.json(users)
		})
		.catch(error => {
			next(error)
		})
}

function addUser(req, res, next) {
	userService.addUser(req.body)
		.then( () => res.json() )
		.catch(error => next(error))
}
