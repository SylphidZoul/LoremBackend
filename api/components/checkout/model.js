const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  order_status: {
    type: String,
    default: 'checkout',
  },
  payment_status: {
    type: String,
    default: 'checkout'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
  }],
  total: Number,
  transaction: {}
})

module.exports = mongoose.model('Payment', paymentSchema)