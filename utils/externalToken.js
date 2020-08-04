const config = require('../config')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(config.google.clientId)

async function verifyGoogleToken( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.google.clientId
  })
  const payload = ticket.getPayload()

  return {
    name: payload.given_name,
    email: payload.email,
    socialNetwork: true
  }
}

async function verifyFacebookToken(token, userId) {
  const appLink = `https://graph.facebook.com/oauth/access_token?client_id=${config.facebook.clientId}&client_secret=${config.facebook.secret}&grant_type=client_credentials`

  const appTokenResponse = await axios.get(appLink)
    .catch(e => {throw Error('Error de Facebook')})
  const appToken = appTokenResponse.data.access_token

  const userLink = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appToken}`

  const user = await axios.get(userLink)
    .catch(e => {throw Error('Error de Facebook')})
  const userVerified = user.data.data

  if (!userVerified.is_valid) return false
  if (userVerified.user_id !== userId) return false

  return true
}

module.exports = {
  verifyGoogleToken,
  verifyFacebookToken
}