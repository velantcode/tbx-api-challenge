const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Error404Router = require('./routes/Error404Router')
const IndexBaseRouter = require('./routes/IndexBaseRouter')

const app = express()

// settings
app.use(cors())
app.set('port', 8081)
app.set('type', 'application/json')
app.set('secretKey', 'n&m#y20oBG09GX*awZuwC&C5Yde^lw4IWQHPz#S0GzgVZ@CSHx')

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '1mb' }))
app.use(express.static('public'))

// routes
app.use('/', IndexBaseRouter)
app.use('/*', Error404Router)

app.listen(app.get('port'), async () => {
  console.log('================================================')
  console.log(`Server running on port ${app.get('port')}`)
  console.log('================================================')
})

module.exports = app
