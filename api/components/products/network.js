const express = require('express')
const router = express.Router()
const querystring = require('querystring');
const controller = require('./controller')
const {verifyToken, verifyAdmin} = require('../../../middlewares/auth')
const response = require('../../../utils/response')

router.get('/:search', (req, res) => {
  let search = querystring.parse(req.params.search)
  controller.getBySearch(search)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, 'No se pudo encontrar el producto', 404, err.message)
    })
})

router.post('/', verifyToken, verifyAdmin, (req, res) => {
  controller.addProduct(req.body)
    .then((product) => {
      response.success(req, res, product, 201)
    })
    .catch((err) => {
      response.error(req, res, 'No se pudo crear el producto', 500, err.message)
    })
})

router.put('/:id', verifyToken, verifyAdmin, (req, res) => {
  controller.updateProduct(req.params.id, req.body)
    .then((updated => {
      response.success(req, res, updated, 200)
    }))
    .catch((err) => {
      response.error(req, res, 'No se ha encontrado el producto', 404, err)
    })
})

router.delete('/:id', verifyToken, verifyAdmin, (req, res) => {
  controller.removeProduct(req.params.id)
  .then((removed => {
    response.success(req, res, removed, 202)
  }))
  .catch((err) => {
    response.error(req, res, 'No se ha encontrado el producto', 404, err.message)
  })
})


module.exports = router