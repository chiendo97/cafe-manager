const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storage = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number
  },
  amount: {
    type: Number,
    required: true
  }
})

const Storage = mongoose.model('Storage', storage)

module.exports = Storage
