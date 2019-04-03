const Menu = require('../db/models/menu.js')

module.exports = {
	getMenu,
	addMenu
}

async function getMenu() {

	return Menu.find({}, (err, menu) =>{
		if (err) throw err
		return menu
	})
}

async function addMenu({ name, price, desc }) {

	const menu = new Menu({
		name,
		price,
		desc
	})

	return menu.save()
}
