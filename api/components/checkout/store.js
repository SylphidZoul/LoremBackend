const Model = require('./model')

const getPayments = () => {
  return Model.find().populate('User', 'name email').populate('Product', 'name unitPrice artist')
}

const getPaymentById = (id) => {
  return Model.findById(id).populate('User', 'name email').populate('Product', 'name unitPrice artist')
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