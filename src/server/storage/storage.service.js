
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
	return storage.map( item => {
		return item
	})
}

async function addItem({ name, price, amount }) {
	const item = {
		name,
		price,
		amount,
		id: 1
	}

	storage.push(item)

	return item;
}
