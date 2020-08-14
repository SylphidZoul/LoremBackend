const store = require('./store')

const getProducts = (query) => {
  if (query === 'latest') return store.getLatestProducts()
  return store.getProducts()
}

const getById = (id) => {
  return store.getById(id)
}

const addProduct = async (body) => {
  const data = {
    name: body.name,
    unitPrice: body.unitPrice,
    artist: body.artist,
    genre: body.genre || "",
    release: body.release || null,
    description: body.description || "",
    stock: body.stock,
    img: body.img || ''
  }

  return store.addProduct(data)
}

const updateProduct = (id, body) => {
  return store.updateProduct(id, body)
}

const removeProduct = (id) => {
  return store.removeProduct(id)
}

module.exports = {
  getProducts,
  getById,
  addProduct,
  updateProduct,
  removeProduct
}