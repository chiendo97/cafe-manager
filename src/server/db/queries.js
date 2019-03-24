const Pool = require('pg').Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/cafe_manager'

const pool = new Pool({
	connectionString: connectionString
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

