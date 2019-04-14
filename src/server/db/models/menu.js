
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menu = new Schema({
  name: {
    type: String, 
    require: true,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})

const Menu = mongoose.model('Menu', menu)

module.exports = Menu
