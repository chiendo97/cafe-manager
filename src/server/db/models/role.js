const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./users')

const roleSchema = new Schema({
  role: {
    type: String,
    require: true,
    unique: true
  }
})

const Role = mongoose.model('Role', roleSchema)

const defaultRole = someRole => {
  if (!someRole) return
  Role.findOneAndUpdate(
    { role: someRole },
    { role: someRole },
    { new: true },
    function(err, data) {
      if (err) throw err
      User.updateOne(
        { username: someRole },
        {
          username: someRole,
          password: 't',
          firstname: 'Chien',
          lastname: 'Le',
          role: data._id,
          checkin: [
            {
              time: Date.now(),
              shift: 1
            }
          ]
        },
        { upsert: true },
        function(err, data) {
          if (err) throw err
        }
      )
    }
  )
}

defaultRole('admin')
defaultRole('manager')
defaultRole('employee')

module.exports = Role
