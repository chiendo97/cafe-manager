const Storage = require('../db/models/storage.js')

module.exports = {
  getStorage,
  addItem,
  exportItem
}

async function exportItem({ name, amount }) {
  return Storage.findOneAndUpdate(
    { name },
    {
      $inc: {
        amount: -1 * amount
      }
    },
    { new: true }
  ).then(item => {
    if (!item) throw 'Item not found'
    return item
  })
}

async function getStorage() {
  return Storage.find({}, (err, items) => {
    if (err) {
      throw err
    }
    console.log(items)
    return items
  })
}

async function addItem({ name, amount }) {
  return Storage.findOne({ name })
    .exec()
    .then(i => {
      if (!i) {
        const item = new Storage({
          name,
          amount
        })

        return item.save()
      }
      i.amount += parseInt(amount)
      return i.save()
    })
}
