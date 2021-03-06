module.exports = {
  api: {
    port: process.env.PORT || 3004,
    dbUrl: process.env.DB_URL 
  },
  jwt: {
    secret: process.env.JWT_SECRET 
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200
  },
  google: {
    clientId: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET 
  },
  facebook: {
    clientId: process.env.FACEBOOK_ID,
    secret: process.env.FACEBOOK_SECRET
  },
  mercadopago: {
    access_token: process.env.MPAGO_TOKEN
  }
}
