const mongoose = require('mongoose')
const Schema = mongoose.Schema


const storage = new Schema({
	name: {
		type: String, 
		require: true,
		unique: true
	},
	price: {
		type: Number,
		require: true,
	},
	amount: {
		type: Number,
		require: true
	}
})

const Storage = mongoose.model('Storage', storage)

module.exports = Storage
