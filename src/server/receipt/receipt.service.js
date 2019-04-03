
const Receipt = require('../db/models/receipt')
const User = require('../db/models/users')

module.exports = {
	getReceipt,
	addReceipt,
}

async function getReceipt() {

	return Receipt.find({})
		.populate('user')
		.then(r => r)
}

async function addReceipt({ username, list}) {
	return User.findOne({username})
		.then( 
			u => {
				const receipt = new Receipt({
					user: u._id,
					list: list
				})
				return receipt.save()
			}
		)
}

