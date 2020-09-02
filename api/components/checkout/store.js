const Model = require('./model')

const getPayments = () => {
  return Model.find().populate('user', 'name email').populate('items.product', 'name unitPrice artist')
}

const getPaymentById = (id) => {
  return Model.findById(id).populate('user', 'name email').populate('items.product', 'name unitPrice artist')
}

const addPayment = (payment) => {
  const myPayment = new Model(payment)
  return myPayment.save()
}

const updatePayment = (id, update) => {
  return Model.findByIdAndUpdate(id, update, { new: true, runValidators: true, useFindAndModify: false })
}

module.exports = {
  getPayments,
  getPaymentById,
  addPayment,
  updatePayment
}