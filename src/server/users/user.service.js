const User = require('../db/models/users.js')
const Role = require('../db/models/role')

module.exports = {
  authenticate,
  getAll,
  addUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  checkin
}

async function authenticate({ username, password }) {
  return User.findOne({ username, password })
    .populate('role')
    .lean()
    .exec()
    .then(user => {
      if (user) {
        const userWithoutPassword = {
          ...user,
          password: '',
          role: user.role.role
        }
        return userWithoutPassword
      }
    })
}

async function deleteUser({ username }) {
  return User.deleteOne({ username })
}

async function updateUser({ username, firstname, lastname }) {
  console.log(username)
  return User.findOneAndUpdate(
    {
      username
    },
    {
      firstname,
      lastname
    },
    {
      new: true
    }
  ).then(user => {
    if (!user) {
      throw 'User not found'
    }
    return user
  })
}

async function getUserByUsername({ username }) {
  return User.findOne({ username })
    .populate('role')
    .lean()
    .exec()
    .then(u => {
      if (u) return u
    })
}

async function getAll() {
  return User.find({})
    .populate('role')
    .lean()
    .exec()
    .then(users =>
      users.map(u => {
        const userWithoutPassword = {
          ...u,
          role: u.role.role,
          description:
            'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        }

        return userWithoutPassword
      })
    )
}

async function checkin({ username, date, shift }) {
  return User.findOne({ username })
    .exec()
    .then(user => {
      if (!user) throw 'User not found: ' + username

      const index = user.checkin.findIndex(ct => {
        const newDate = new Date(date).setHours(12, 0, 0, 0)
        const curDate = new Date(ct.time).setHours(12, 0, 0, 0)
        return newDate === curDate
      })

      if (index === -1) {
        user.checkin.push({
          time: date,
          shift
        })
      } else {
        user.checkin[index].shift = shift
      }

      return user.save()
    })
}

async function addUser(user) {
  return Role.findOne({ role: user.role })
    .exec()
    .then(roleModel => {
      if (!roleModel) throw 'Role not found: ' + role
      const newUser = new User({
        ...user,
        role: roleModel._id
      })
      return newUser.save()
    })
}
