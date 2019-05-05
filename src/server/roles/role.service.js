const Role = require('../db/models/role')

module.exports = {
  getAllRole
}

async function getAllRole() {
  return Role.find({}).then(r => r)
}
