const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  checkin: [
    {
      time: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
      },
      shift: {
        type: mongoose.Schema.Types.Number,
        default: 1
      }
    }
  ],
  dataAdded: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
