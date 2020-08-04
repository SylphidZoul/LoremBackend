const DB = require('mongoose');

DB.Promise = global.Promise;
const connect = (url) => {
  DB.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('[DB] Successful connection'))
  .catch(err => console.error('[DB]', err));
}

module.exports = connect