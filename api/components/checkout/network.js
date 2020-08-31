const express = require('express')
const router = express.Router()
const controller = require('./controller')
const {verifyToken} = require('../../../middlewares/auth')
const response = require('../../../utils/response')

router.post('/', verifyToken, (req, res) => {
  console.log('a ver si sale')
  controller.generateCheckoutUrl(req.body, req.decoded)
    .then(resp => {
      response.success(req, res, resp.data, 200)
    })
    .catch(error => {
      console.log(error)
      response.error(req, res, 'error', 400, error)
    })
})

router.post('/webhook', (req, res) => {
  controller.test(req.body)

  response.success(req, res, 'ok', 200)
})
router.get('/webhook', (req, res) => {
  response.success(req, res, 'ok', 200)
})

module.exports = router