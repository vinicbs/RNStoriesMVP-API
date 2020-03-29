require('dotenv').config()
const pg = require('pg')
pg.defaults.ssl = true

module.exports = {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  }