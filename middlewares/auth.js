const jwt = require('jsonwebtoken')
const config = require('../config')
const response = require('../utils/response')

const getToken = (req, res) => {
  if (!req.headers.authorization) {
    response.error(req, res, 'Token not found', 400)
  }
  if (req.headers.authorization.indexOf('Bearer ') === -1) {
    response.error(req, res, 'Invalid token format', 400)
  }
  const token = req.headers.authorization.replace('Bearer ', '')

  return token
}

const verifyToken = (req, res, next) => {
  try {
    const token = getToken(req, res)
    const decoded = jwt.verify(token, config.jwt.secret)
    req.decoded = decoded
    return next()
    
  } catch (error) {
    response.error(req, res, 'Invalid Token', 400, error.message)
  }
}

const verifyAdmin = (req, res, next) => {

  const user = req.decoded.user
  
  if(user.role !== 'ADMIN_ROLE') {
    return response.error(req, res, 'User must be ADMIN', 403)
  }

  return next()
}

module.exports = {
  verifyToken,
  verifyAdmin
}