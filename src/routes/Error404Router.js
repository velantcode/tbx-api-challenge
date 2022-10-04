const express = require('express')

const Error404Router = express.Router()

function res404 (req, res) {
  return res.status(404).json({
    error: 'Not found!'
  })
}

// ===================================================================================

// Msg para rutas no encontradas
Error404Router.all('/', res404)

// ===================================================================================

module.exports = Error404Router
