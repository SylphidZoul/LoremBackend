exports.success = (req, res, message, status) => {
  let statusCode = status || 200
  let statusMessage = message || ""

  res.status(statusCode).send({
    error: false,
    status: status,
    body: statusMessage
  })
}
exports.error = (req, res, message, status, err) => {
  let statusCode = status || 500
  let statusMessage = message || 'Internal server error'
  if(err) console.error(err)
  
  res.status(statusCode).send({
    error: true,
    status: status,
    body: statusMessage
  })
}