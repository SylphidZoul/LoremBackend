const express = require('express')
const router = express.Router()
const controller = require('./controller')
const {verifyToken} = require('../../../middlewares/auth')
const response = require('../../../utils/response')
const PaymentController = require('./webhook')

const PaymentInstance = new PaymentController()

router.post('/', verifyToken, (req, res) => {
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
  console.log(req.body)
  PaymentInstance.webhook(req, res)
  res.status(200).send('ok')
})

module.exports = router