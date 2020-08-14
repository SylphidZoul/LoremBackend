module.exports = {
  api: {
    port: process.env.API_PORT || 3004,
    dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_sylphid:Olazabal3805@cluster0.gzgpp.mongodb.net/LoremDB?retryWrites=true&w=majority'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200
  },
  google: {
    clientId: process.env.GOOGLE_ID || '252898407705-nf1nqeck3dnbjrl7d7nf1evvhvmeubr8.apps.googleusercontent.com',
    secret: process.env.GOOGLE_SECRET || 'tqKWwSeb6DAlIfR5VuLYBuM6'
  },
  facebook: {
    clientId: process.env.FACEBOOK_ID || '1698932393605899',
    secret: process.env.FACEBOOK_SECRET || '72c997923a9cccc5c170609d6ef7715d'
  }
}