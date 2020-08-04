const Model = require('./model')

const getUser = (email) => {
  return Model.findOne({ email })
}

const addUser = (user) => {
  const myUser = new Model(user);
  return myUser.save()
}

module.exports = {
  getUser,
  addUser
}
