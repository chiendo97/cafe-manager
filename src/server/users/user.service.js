let idCount = 2

const users = [
	{
		id: 1,
		username: 't',
		password: 't',
		firstName: 'Test',
		lastName: 'Test'
	}
]

module.exports = {
	authenticate,
	getAll,
	addUser
}

async function authenticate({ username, password }) {
	const user = users.find(u => u.username === username && u.password === password)
	if (user) {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
}

async function getAll() {
	return users.map( u => {
		const { password, ...userWithoutPassword } = u
		return userWithoutPassword
	} )
}

async function addUser( {username, password, firstName, lastName }) {
	const user = {
		username,
		password,
		firstName,
		lastName,
		id: idCount++
	}
	users.push(user);

	return user;
}
