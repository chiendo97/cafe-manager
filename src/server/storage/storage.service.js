const db = require('../db/queries.js')

const storage = [
	{
		name: 'meat',
		price: 4,
		amount: 4
	}
]

module.exports = {
	getStorage,
	addItem,
}

async function getStorage() {

	return db.query('SELECT * FROM storage')
		.then( (res) => {
			return res.rows;
		})
}

async function addItem({ name, price, amount }) {

	return db.query('INSERT INTO storage (name, price, amount) VALUES ($1, $2, $3)', [name, price, amount])
}
