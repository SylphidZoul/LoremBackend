const store = require('./store')

const getBySearch = (search) => {
  if (search.id) return store.getById(search.id)
  if (search.query === 'feed') return store.getLatestProducts()

  let query = {}
  query.pageNumber = search.pageNumber - 1
  let fieldSearch = {$regex: search.query, $options: 'i'}

  switch (search.field) {
    case 'name':
      query.field = { name: fieldSearch}
      break;
    case 'artist':
      query.field = { artist: fieldSearch}
      break
    case 'genre':
      query.field = { genre: fieldSearch}
      break
    case 'tracks':
      query.field = { tracks: fieldSearch}
      break
    default:
      query.field = {$or: [
        {name: fieldSearch},
        {artist: fieldSearch},
        {genre: fieldSearch},
        {tracks: fieldSearch},
        {description: fieldSearch}
      ]}
      break;
  }

  switch (search.sort) {
    case 'price':
      query.sort = { unitPrice: 1 }
      break;
    case 'artist':
      query.sort = { artist: 1 }
      break;
    case 'release':
      query.sort = { release: -1}
      break
    case 'sales':
      query.sort = { sales: -1}
      break
    default:
      query.sort = { _id: -1 }
      break;
  }
  
  return store.getProducts(query)
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
  getBySearch,
  addProduct,
  updateProduct,
  removeProduct
}