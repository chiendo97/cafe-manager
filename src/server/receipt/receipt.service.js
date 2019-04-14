
const Receipt = require('../db/models/receipt')
const User = require('../db/models/users')

module.exports = {
  getReceipt,
  addReceipt,
}

async function getReceipt() {

  return Receipt.find({})
    .populate('user')
    .lean()
    .then(receipt => {
      const receipts = receipt.map(r => {

        const receipt = {
          ...r,
          user: r.user.firstname + ' ' + r.user.lastname
        }
        return receipt
      })
      return receipts
    })
}

async function addReceipt({ username, list}) {
  return User.findOne({username})
    .then( 
      u => {
        if (!u) throw 'user not found ' + username
        const receipt = new Receipt({
          user: u._id,
          list: list
        })
        return receipt.save()
      }
    )
}

