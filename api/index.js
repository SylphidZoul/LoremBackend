const express = require('express')
const users = require('./components/user/network')
const products = require('./components/products/network')
const keys = require('./components/keys/network')
const checkout = require('./components/checkout/network')
const config = require('../config.js')
const cors = require('cors')
const DB = require('../db')
const app = express()

app.use(cors(config.cors))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ strict: false,  }))

DB(config.api.dbUrl)

app.use('/user', users)
app.use('/products', products)
app.use('/keys', keys)
app.use('/checkout', checkout)

app.listen(config.api.port, () => {
  console.log(`Listening to port ${config.api.port}`)
})
