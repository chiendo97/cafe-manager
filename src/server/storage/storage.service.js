const Storage = require('../db/models/storage.js')

module.exports = {
  getStorage,
  addItem,
  exportItem
}

async function exportItem({ name, amount }) {
  return Storage.findOne({ name })
    .exec()
    .then(storage => {
      if (!storage) throw 'Item not found'
      if (storage.amount < amount) throw 'Amount negative'
      storage.amount -= amount
      return storage.save()
    })
}

async function getStorage() {
  return Storage.find({}, (err, items) => {
    if (err) {
      throw err
    }
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
