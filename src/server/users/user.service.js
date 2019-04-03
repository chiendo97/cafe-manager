const User = require('../db/models/users.js')

module.exports = {
	authenticate,
	getAll,
	addUser
}

async function getUserByUsername(username) {

	return User.findOne({ username }, (err, user) => {
		if (err) throw err
		return user
	})
}

async function authenticate({ username, password }) {

	return User.findOne({ username, password }, (err, user) => {
		if (err) throw err
		if (user) {
			const { password, ...userWithoutPassword } = user
			return userWithoutPassword
		}
	})
}

async function getAll() {

	return User.find({}, (err, users) => {
		if (err) throw err
		return users.map( u => {
			const { password, ...userWithoutPassword } = u
			return userWithoutPassword
		} )
	})
}

async function addUser( {username, password, firstName, lastName }) {

	const user = new User({ username, password, firstname: firstName, lastname: lastName })
	return user.save()
}
