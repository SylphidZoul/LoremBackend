const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../../utils/response')
const {verifyToken} = require('../../../middlewares/auth')

router.get('/', verifyToken, (req, res) => {
  controller.getUser(req.decoded.user.email)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(err => {
    response.error(req, res, 'Invalid Token', 400, err.message)
  })
})

router.post('/login', (req, res) => {
  controller.login(req.body.email, req.body.password)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(err => {
      response.error(req, res, err.message, 400, err.message)
    })
})

router.post('/signup', (req, res) => {
  controller.signup(req.body.name, req.body.email, req.body.password)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(err => {
      response.error(req, res, err.message, 400, err.message)
    })
})

router.post('/google', (req, res) => {
  controller.verifyGoogle(req.body.token)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(err => {
    response.error(req, res, err.message, 400, err.message)
  })
})

router.post('/facebook', (req, res) => {
  controller.verifyFacebook(req.body.token)
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(err => {
    response.error(req, res, err.message, 400, err.message)
  })
})
module.exports = router
