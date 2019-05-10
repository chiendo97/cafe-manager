const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

//const basicAuth = require('./_helpers/basic-auth')
const { basicAuth, authorize } = require('./_helpers/basic-auth')
const errorHandler = require('./_helpers/error-handler')

// Load database setup
const db = require('./db/db.js')

app.use(bodyParser.json())
app.use(cors())

app.use('/api/', basicAuth)
//app.use('/api/', authorize())

app.use('/api/users/', require('./users/user.controller.js'))
app.use('/api/storage/', require('./storage/storage.controller.js'))
app.use('/api/menu/', require('./menu/menu.controller.js'))
app.use('/api/receipt', require('./receipt/receipt.controller.js'))
app.use('/api/role/', require('./roles/role.controller'))

app.use(express.static('deploy'))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../deploy/index.html'))
})


app.use(errorHandler)

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
