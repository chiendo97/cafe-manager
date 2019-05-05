const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receipt = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  list: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number,
        default: 2
      },
      total: {
        type: Number,
        default: 10
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
})

receipt.pre('save', function(next) {
  this.total = this.list.reduce((pre, cur) => pre + cur.total, 0)
  next()
})

const Receipt = mongoose.model('Receipt', receipt)

module.exports = Receipt
