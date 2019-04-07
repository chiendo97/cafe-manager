const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  role: {
    type: String,
    require: true,
    unique: true,
  }
})

const Role = mongoose.model('Role', roleSchema)


const defaultRole = (someRole) => {
  if (!someRole) return
  Role.findOne({role: someRole}, function(err, role) {
    if (err) throw err

    if (!role) {
      const adminRole = new Role({
        role: someRole
      })
      adminRole.save()
    }
  })
}

defaultRole('admin')
defaultRole('manager')
defaultRole('employee')

module.exports = Role
