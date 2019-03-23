const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const basicAuth = require('./_helpers/basic-auth')
const errorHandler = require('./_helpers/error-handler')

app.use(bodyParser.json())
app.use(cors())

app.use('/api/', basicAuth)

app.use('/api/users/', require('./users/user.controller.js'))
app.use('/api/storage/', require('./storage/storage.controller.js'))

app.use(express.static('deploy'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../deploy/index.html'))
})

app.use(errorHandler)

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
	console.log('Server listening on port ' + port)
})
