const express = require('express')
const router = express.Router()
const receiptService = require('./receipt.service.js')

router.post('/addReceipt', addReceipt)
router.get('/getReceipt', getReceipt)

module.exports = router

function getReceipt(req, res, next) {
	receiptService.getReceipt()
		.then(items => {
			return res.json(items)
		})
		.catch(error => next(error))
}

function addReceipt(req, res, next) {
	receiptService.addReceipt(req.body)
		.then( () => res.json() )
		.catch(error => next(error))
}
