const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const basicAuth = require('./_helpers/basic-auth')
const errorHandler = require('./_helpers/error-handler')

app.use(bodyParser.json())
app.use(cors())

app.use(basicAuth)

app.use('/api/users/', require('./users/user.controller.js'))
app.use('/api/storage/', require('./storage/storage.controller.js'))


app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? 80 : 4000
const server = app.listen(port, () => {
	console.log('Server listening on port ' + port)
})
