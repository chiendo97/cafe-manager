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
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
      }
    )
}

async function deleteUser({ username }) {
  return User.deleteOne({username})
}

async function updateUser({ username, firstname, lastname}) {

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
          const { password, ...userWithoutPassword } = u
          return userWithoutPassword
        })
    )
}

async function addUser( {username, password, firstName, lastName, role }) {
  return Role.findOne({role}).exec().then(
    roleModel => {
      if (!roleModel) throw 'Role not found: ' + role
      const user = new User({ username, password, firstname: firstName, lastname: lastName, role: roleModel._id })
      return user.save()
    }
  )
}
