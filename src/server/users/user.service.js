const User = require('../db/models/users.js')
const Role = require('../db/models/role')

module.exports = {
	authenticate,
	getAll,
  addUser,
  getUserByUsername,
  updateUser,
  deleteUser
}

async function authenticate({ username, password }) {

  return User.findOne({ username, password }).populate('role').lean().exec()
    .then(
      user => {
        if (user) {
          const userWithoutPassword = {...user, password: '', role: user.role.role}
          return userWithoutPassword
        }
      }
    )
}

async function deleteUser({ username }) {
  return User.deleteOne({username})
}

async function updateUser({ username, firstname, lastname}) {

  console.log(username)
  return User.findOneAndUpdate({ 
    username, 
  }, {
    firstname,
    lastname,
  }, {
    new: true
  })
    .then(user => {
      if (!user) {
        throw "User not found"
      }
      return user
    })

}

async function getUserByUsername({ username }) {

  return User.findOne({ username }).populate('role').lean().exec()
    .then(
      u => {
        if (u) return u
      }
    )
}

async function getAll() {

  return User.find({}).populate('role').lean().exec()
    .then(
      users => users.map( u => {
        //const { password, ...userWithoutPassword } = u
        const userWithoutPassword = {
          username: u.username,
          firstname: u.firstname,
          lastname: u.lastname,
          role: u.role.role,
          description: 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        }

        return userWithoutPassword
      })
    )
}

async function addUser( {username, password, firstname, lastname, role }) {
  return Role.findOne({role}).exec().then(
    roleModel => {
      if (!roleModel) throw 'Role not found: ' + role
      const user = new User({ username, password, firstname, lastname, role: roleModel._id })
      return user.save()
    }
  )
}
