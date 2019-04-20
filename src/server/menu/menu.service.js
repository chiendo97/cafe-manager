const Menu = require('../db/models/menu.js')

module.exports = {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuByName
}

async function getMenuByName({ name }) {
  return Menu.findOne({ name }).lean().exec()
}

async function deleteMenu({ name }) {
  return Menu.deleteOne({ name })
}

async function updateMenu({ name, price, desc }) {

  return Menu.findOneAndUpdate({ name }, { price, desc }, { new: true }).lean().exec()
    .then(menu => {
      if (!menu) throw "Menu not found"
      return menu
    })

}

async function getMenu() {

  return Menu.find({}, (err, menu) => {
    if (err) throw err
    return menu
  })
}

async function addMenu({ name, price, desc, image }) {

  const menu = new Menu({
    name,
    price,
    desc,
    image
  })

  return menu.save()
}
