const Model = require('./model')

const getProducts = (query) => {
  return Model.find(query.field).sort(query.sort).limit(15).skip(15*query.pageNumber)
}

const getLatestProducts = () => {
  return Model.find().sort({ _id: -1 }).limit(12)
}

const getById = (id) => {
  return Model.findById(id)
}

const addProduct = (product) => {
  const myProduct = new Model(product)
  return myProduct.save()
}

const updateProduct = (id, body) => {
  return Model.findByIdAndUpdate(id, body, { new: true, runValidators: true, useFindAndModify: false })
}

const removeProduct = (id) => {
  return Model.findByIdAndDelete(id)
}

module.exports = {
  getProducts,
  getLatestProducts,
  getById,
  addProduct,
  updateProduct,
  removeProduct
}