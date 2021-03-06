const express = require('express')
const router = express.Router()
const userService = require('./user.service.js')
const { authorize } = require('../_helpers/basic-auth')

router.post('/authenticate', authenticate)
router.get('/getAll', authorize('admin'), getAll)
router.post('/addUser', authorize('admin'), addUser)
router.get(
  '/getUserByUsername/:username',
  authorize(['admin', 'manager']),
  getUserByUsername
)
router.put('/updateUser', authorize(), updateUser)
router.delete('/deleteUser', authorize('admin'), deleteUser)
router.post('/checkin', authorize(['admin', 'manager']), checkin)

module.exports = router

function checkin(req, res, next) {
  const { username, date, shift } = req.body

  userService
    .checkin({ username, date, shift })
    .then(() => res.json())
    .catch(error => next(error))
}

function deleteUser(req, res, next) {
  const { username } = req.body

  userService
    .deleteUser({ username })
    .then(() => res.json())
    .catch(error => {
      next(error)
    })
}

function getUserByUsername(req, res, next) {
  const { username } = req.params
  const currentUser = req.user

  // remove soon
  if (username !== currentUser.username && currentUser.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .getUserByUsername({ username })
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'User not found' })
    )
    .catch(error => {
      next(error)
    })
}

function updateUser(req, res, next) {
  const { username } = req.body
  const currentUser = req.user

  if (username !== currentUser.username && currentUser.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  userService
    .updateUser(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Can not update user' })
    )
    .catch(error => {
      next(error)
    })
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(400)
            .json({ message: 'Username and password is incorrect' })
    )
    .catch(error => {
      next(error)
    })
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(error => next(error))
}

function addUser(req, res, next) {
  userService
    .addUser(req.body)
    .then(() => res.json())
    .catch(error => next(error))
}
