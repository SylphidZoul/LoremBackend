const express = require('express')
const router = express.Router()
const controller = require('./controller')
const {verifyToken} = require('../../../middlewares/auth')
const response = require('../../../utils/response')
const querystring = require('querystring');

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
  console.log('a ver si entra')
  if (req.method === "POST") { 
    let body = ""; 
    req.on("data", chunk => {  
      body += chunk.toString();
      console.log(body)
    });
    req.on("end", () => {  
      console.log(body, "webhook response"); 
      res.end("ok");
    });
  }
  res.status(200); 
})
router.get('/webhook', (req, res) => {
  response.success(req, res, 'ok', 200)
})

module.exports = router