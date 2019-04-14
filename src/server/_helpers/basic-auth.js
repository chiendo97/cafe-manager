const userService = require('../users/user.service.js')

//module.exports = basicAuth
module.exports = {
  basicAuth,
  authorize
}

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }


  return async (req, res, next) => {
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

    console.log(req.path)

    if (roles.length && user.role && !roles.includes(user.role)) {
      console.log('fails')
      console.log('roles: ', roles)
      console.log('user role: ', user.role)
      return res.status(401).json({ message: 'Unauthorized'})
    }

    next()
  }
}

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
