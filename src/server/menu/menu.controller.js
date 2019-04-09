const express = require('express')
const router = express.Router()
const menuService = require('./menu.service.js')
const { authorize } = require('../_helpers/basic-auth')

router.post('/addMenu', authorize('admin', 'manager'), addMenu)
router.get('/getMenu', authorize(), getMenu)
router.put('/updateMenu', authorize('admin', 'manager'), updateMenu)
router.delete('/deleteMenu', authorize('admin', 'manager'), deleteMenu)
router.get('/getMenuByName/:name', authorize('admin', 'manager'), getMenuByName)

module.exports = router

function getMenuByName(req, res, next) {
  const { name } = req.params
  menuService.getMenuByName({ name })
    .then(menu => menu ? res.json(menu) : res.status(400).json({ message: "menu not found"}))
    .catch(error => {next(error)})
}

function deleteMenu(req, res, next) {
  menuService.deleteMenu(req.body)
    .then(() => res.json())
    .catch(error => {next(error)})
}

function updateMenu(req, res, next) {
  menuService.updateMenu(req.body)
    .then(menu => menu ? res.json(menu) : res.status(400).json({ message: "can not update menu"}))
    .catch(error => {next(error)})
}

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
