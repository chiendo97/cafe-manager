const express = require('express')
const router = express.Router()
const userService = require('./user.service.js')

router.post('/authenticate', authenticate)
router.get('/getAll', getAll)
router.post('/addUser', addUser)
router.get('/getUserByUsername/:username', getUserByUsername)
router.put('/updateUser', updateUser)
router.delete('/deleteUser', deleteUser)

module.exports = router

function deleteUser(req, res, next) {
  const { username } = req.body

  console.log('delete', username)

  userService.deleteUser({ username })
    .then(() => res.json())
    .catch(error => {next(error)})
}

function getUserByUsername(req, res, next) {
  const { username } = req.params
  userService.getUserByUsername({ username })
		.then(user => user ? res.json(user) : res.status(400).json( { message: 'User not found'} ))
    .catch(error => { next(error) })
}

function updateUser(req, res, next) {

  userService.updateUser(req.body)
    .then(user => user ? res.json(user) : res.status(400).json( { message: 'Can not update user'} ))
    .catch(error => { next(error)})
}

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
      //console.log(users)
			res.json(users)
		})
		.catch(error => {
			next(error)
		})
}

function addUser(req, res, next) {
	userService.addUser(req.body)
		.then(() => res.json())
		.catch(error => next(error))
}
