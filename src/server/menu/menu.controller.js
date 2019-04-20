const express = require('express')
const router = express.Router()
const path = require('path')

const menuService = require('./menu.service.js')
const { authorize } = require('../_helpers/basic-auth')
const upload = require('../_helpers/upload')
const Resize = require('../_helpers/Resize')

router.post('/upload', upload.single('image'), async (req, res) => {

  const imagepath = path.join(__dirname, '/public/images')
  const fileUpload = new Resize(imagepath)

  if (!req.file) {
    res.status(401).json({ error: 'No image file' })
  }

  const filename = await fileUpload.save(req.file.buffer)

  return res.status(201).json({ name: filename })
})

router.post('/addMenu', upload.single('image'), authorize('admin', 'manager'), addMenu)
router.get('/getMenu', authorize(), getMenu)
router.put('/updateMenu', authorize('admin', 'manager'), updateMenu)
router.delete('/deleteMenu', authorize('admin', 'manager'), deleteMenu)
router.get('/getMenuByName/:name', authorize('admin', 'manager'), getMenuByName)

module.exports = router

function getMenuByName(req, res, next) {
  const { name } = req.params
  menuService.getMenuByName({ name })
    .then(menu => menu ? res.json(menu) : res.status(400).json({ message: "menu not found" }))
    .catch(error => { next(error) })
}

function deleteMenu(req, res, next) {
  menuService.deleteMenu(req.body)
    .then(() => res.json())
    .catch(error => { next(error) })
}

function updateMenu(req, res, next) {
  menuService.updateMenu(req.body)
    .then(menu => menu ? res.json(menu) : res.status(400).json({ message: "can not update menu" }))
    .catch(error => { next(error) })
}

function getMenu(req, res, next) {
  console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
  menuService.getMenu()
    .then(items => res.json(items))
    .catch(error => next(error))
}

async function addMenu(req, res, next) {

  const imagepath = path.join(path.dirname(require.main.filename), '/public/images')
  const fileUpload = new Resize(imagepath)

  const filename = req.file ?
    await fileUpload.save(req.file.buffer)
    :
    ''

  //if (!req.file) {
  //return res.status(501).json({ message: 'No image file' })
  //} else {
  //const filename = await fileUpload.save(req.file.buffer)
  //}

  const body = Object.assign(JSON.parse(req.body.body), { image: filename })

  menuService.addMenu(body)
    .then(() => res.json())
    .catch(error => next(error))
}
