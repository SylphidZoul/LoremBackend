const store = require('./store')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../../config')
const {verifyGoogleToken, verifyFacebookToken} = require('../../../utils/externalToken');

const getUser = (email) => {
  return store.getUser(email)
}

const login = async (email, password) => {
  const user = await store.getUser(email)
    .catch(e => {throw Error('Email o contraseña incorrecto.')})

  const correctPassword = await bcrypt.compare(password, user.password)
  if(!correctPassword) throw Error('Email o contraseña incorrecto.')

  const token = jwt.sign({user}, config.jwt.secret, {expiresIn: '5d'})
  
  return {user, token}
}

const signup = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 5)
  const data = {
    name,
    email,
    password: hashedPassword
  }
    const user = await store.addUser(data)
      .catch((e) => {throw Error('El email ya esta en uso')})
    const token = jwt.sign({user}, config.jwt.secret)

    return {user, token}
}

const verifyGoogle = async (googleToken) => {
  const googleUser = await verifyGoogleToken(googleToken)
    .catch(e => {throw Error('Token de Google inválido')})
  
  const userDB = await store.getUser(googleUser.email)
  if (!userDB) {
      googleUser.password = 'notAPassword'
      const user = await store.addUser(googleUser)
      const token = jwt.sign({user}, config.jwt.secret)
      return {user, token}
    }

  const user = userDB
  const token = jwt.sign({user}, config.jwt.secret)

  return {user, token}
}

const verifyFacebook = async (userData) => {
  const verifiedUser = await verifyFacebookToken(userData.accessToken, userData.userID)
  if (!verifiedUser) throw Error('Token inválido')

  const userDB = await store.getUser(userData.email)
  if (!userDB) {
      const name = userData.name.split(" ")
      const newUser = {
        name: name[0],
        email: userData.email,
        password: 'notAPassword',
        socialNetwork: true
      }
      const user = await store.addUser(newUser)
      const token = jwt.sign({user}, config.jwt.secret)
      return {user, token}
    }

  const user = userDB
  const token = jwt.sign({user}, config.jwt.secret)

  return {user, token}
}

module.exports = {
  getUser,
  login,
  signup,
  verifyGoogle,
  verifyFacebook
}