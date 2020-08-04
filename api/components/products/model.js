var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
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
    img: {
      type: String,
      required: false
    },
    /* categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    }, */
})


module.exports = mongoose.model('Product', productSchema);