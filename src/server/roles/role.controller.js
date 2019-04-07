const express = require('express')
const router = express.Router()
const roleService = require('./role.service')

router.get('/getAllRole', getAllRole)

module.exports = router

function getAllRole(req, res, next) {
  roleService.getAllRole()
    .then(r => res.json(r))
    .catch(err => next(err))
}
