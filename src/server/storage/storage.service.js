const Storage = require('../db/models/storage.js')

module.exports = {
	getStorage,
	addItem,
}

async function getStorage() {

	return Storage.find({}, (err, items) => {
		if (err) {
			throw err
		}
		return items;
	})
}

async function addItem({ name, price, amount }) {

	const item = new Storage({
		name,
		price,
		amount
	})

	return item.save()
}
