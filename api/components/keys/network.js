const express = require('express')
const router = express.Router()
const response = require('../../../utils/response')
const config = require('../../../config')

router.get('/', (req, res) => {
  const keys = {
    google: config.google.clientId,
    facebook: config.facebook.clientId
  }
  response.success(req, res, keys, 200)
})

module.exports = router