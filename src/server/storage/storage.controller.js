const express = require('express')
const router = express.Router()
const storageService = require('./storage.service.js')
const { authorize } = require('../_helpers/basic-auth')

router.post('/addItem', authorize('admin', 'manager'), addItem)
router.get('/getStorage', authorize(), getStorage)
router.put('/exportItem', authorize(['manager', 'admin']), exportItem)

module.exports = router

function exportItem(req, res, next) {
  storageService
    .exportItem(req.body)
    .then(item =>
      item
        ? res.json(item)
        : res.status(400).json({ message: 'Can not export item' })
    )
    .catch(error => {
      next(error)
    })
}

function getStorage(req, res, next) {
  storageService
    .getStorage()
    .then(items => res.json(items))
    .catch(error => next(error))
}

function addItem(req, res, next) {
  storageService
    .addItem(req.body)
    .then(() => res.json())
    .catch(error => next(error))
}
