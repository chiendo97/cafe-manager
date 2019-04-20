module.exports = errorHandler

async function errorHandler(err, req, res, next) {
  console.log("errorHandler", err)
  if (typeof (err) === 'string') {
    return res.status(400).json({ message: err })
  }

  return res.status(500).json({ message: err.message })
}
