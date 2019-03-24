const db = require('../db/queries.js')


module.exports = {
	authenticate,
	getAll,
	addUser
}

async function authenticate({ username, password }) {

	return db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
		.then(res => {
			const user = res.rows[0]
			if (user) {
				const { password, ...userWithoutPassword } = user
				return userWithoutPassword
			}
		})
}

async function getAll() {

	return db.query('SELECT * FROM users ORDER BY id ASC')
		.then(res => {
			const users = res.rows
			return users.map( u => {
				const { password, ...userWithoutPassword } = u
				return userWithoutPassword
			} )
		})
}

async function addUser( {username, password, firstName, lastName }) {

	return db.query('INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)', [username, password, firstName, lastName])
}
