const userService = require('../users/user.service.js')

module.exports = basicAuth

async function basicAuth(req, res, next) {
	if (req.path === '/users/authenticate') {
		return next()
	}

	if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' })
	}

	const base64Credentials = req.headers.authorization.split(' ')[1]
	const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
	const [username, password] = credentials.split(':')
	const user = await userService.authenticate({ username, password })

	if (!user) {
		return res.status(401).json({ message: 'Invalid Authorization Credentials' })
	}

	req.user = user

	next()
}
