
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menu = new Schema({
	name: {
		type: String, 
		require: true,
		unique: true
	},
	price: {
		type: Number,
		require: true,
	},
	desc: {
		type: String,
		require: true
	}
})

const Menu = mongoose.model('Menu', menu)

module.exports = Menu
