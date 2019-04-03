const mongoose = require('mongoose')
const User = require('./models/users.js')
const Menu = require('./models/menu.js')
const Receipt = require('./models/receipt.js')

const database_url = process.env.MONGODB_URI || 'mongodb://localhost/cafe_manager'

const con = mongoose.connect(database_url, {
	useNewUrlParser: true,
	useCreateIndex: true
}, (err) => {
	if (err) throw err
})

module.exports = con

