const express = require('express')
const FilesController = require('../controllers/FilesController')

const IndexRoute = express.Router()

// ===================================================================================

// ruta de pruebas
IndexRoute.get('/', (req, res) => {
  res.json({
    msg: 'API Challenge 2022'
  })
})

// ===================================================================================

IndexRoute.get('/files/list', FilesController.getOriginalFilesData)

IndexRoute.get('/files/data', FilesController.getFiles)

// ===================================================================================

module.exports = IndexRoute
