const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  unitPrice: {
    type: Number,
    required: [true, 'El precio unitario es necesario']
  },
  artist: {
    type: String,
    required: [true, 'El artista es necesario']
  },
  genre: {
    type: String,
    required: false
  },
  tracks: [{
    type: String,
    required: [true, 'La tracklist es necesaria']
  }],
  sales: {
    type: Number,
    required: [false]
  },
  release: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  stock: {
    type: Number,
    required: [true, 'El stock es necesario']
  },
  spotify: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
})
module.exports = mongoose.model('Product', productSchema)
